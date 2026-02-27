"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/shared/hooks";
import {
  Button,
  Checkbox,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/ui";
import {
  BreakTime,
  convertDBToUI,
  convertUIToDB,
  DaySchedule,
  HOURS,
  MINUTES,
  mockDefaultSchedule,
} from "@/entities/availability";
import { Branch, CreateBranchData } from "@/entities/branch";
import type { Service } from "@/entities/service";
import {
  assignProductToLocation,
  getBusinessProducts,
  getLocationProducts,
  removeProductFromLocation,
} from "@/features/dashboard/administration/products-management";
import { getServices } from "@/features/dashboard/administration/services-management";
import { useBranchOperations } from "../api/branches-hooks";
import { LocationPicker } from "./location-picker";
import { Copy, Loader2, MapPin, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";

// Declaraciones de tipos para Google Maps
declare global {
  interface Window {
    google: any;
  }
}

interface BranchFormProps {
  branch?: Branch | null;
  onSave: (data: CreateBranchData, selectedProducts: string[]) => void;
  onCancel: () => void;
  onBranchUpdate?: (updatedBranch: Branch) => void; // Callback para actualizar el branch localmente
}

export function BranchForm({ branch, onSave, onCancel, onBranchUpdate }: BranchFormProps) {
  const [activeTab, setActiveTab] = useState("basico");
  const [formData, setFormData] = useState<CreateBranchData>({
    name: "",
    address: "",
    phone: "",
    services: [],
    coordinates: { lat: 0, lng: 0 }, // Inicializar en 0 para que LocationPicker pida ubicación
  });

  const [phoneNumber, setPhoneNumber] = useState<string>(""); // Solo el número sin código
  const [countryCode, setCountryCode] = useState<string>("+591"); // Código de país separado

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [serviceSearch, setServiceSearch] = useState("");
  const [availableServices, setAvailableServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [loadingMoreServices, setLoadingMoreServices] = useState(false);
  const [currentServicePage, setCurrentServicePage] = useState(1);
  const [hasMoreServices, setHasMoreServices] = useState(true);
  const [totalServicesCount, setTotalServicesCount] = useState(0);
  const [selectingAllServices, setSelectingAllServices] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectingAllProducts, setSelectingAllProducts] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const [availableProducts, setAvailableProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingMoreProducts, setLoadingMoreProducts] = useState(false);
  const [currentProductPage, setCurrentProductPage] = useState(1);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const [totalProductsCount, setTotalProductsCount] = useState(0);
  const [localBranch, setLocalBranch] = useState<Branch | null>(branch || null); // Branch local para actualizaciones
  const [schedule, setSchedule] = useState<DaySchedule[]>(mockDefaultSchedule);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  const { business } = useAuth();
  const { addServiceToBranch, removeServiceFromBranch } = useBranchOperations();

  // Cargar el script de Google Maps
  useEffect(() => {
    if (!window.google && apiKey) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;

      script.onerror = () => {
        setMapError(
          "Error al cargar Google Maps. Verifica tu API Key y que las APIs estén habilitadas.",
        );
        console.error("Error loading Google Maps script");
      };

      document.head.appendChild(script);

      return () => {
        // Cleanup si el componente se desmonta
        const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
        if (existingScript && existingScript === script) {
          document.head.removeChild(script);
        }
      };
    }
  }, [apiKey]);

  // Handlers para LocationPicker
  const handleAddressChange = (newAddress: string) => {
    setFormData((prev) => ({ ...prev, address: newAddress }));
  };

  const handleLocationChange = (location: { lat: number; lng: number }) => {
    setFormData((prev) => ({ ...prev, coordinates: location }));
  };

  // Función para agregar AM/PM a la hora
  const formatHourWithAmPm = (hour: string): string => {
    const hourNum = parseInt(hour, 10);
    return hourNum < 12 ? `${hour} AM` : `${hour} PM`;
  };

  // Función para parsear el teléfono completo y separar código del número
  const parsePhoneNumber = (fullPhone: string) => {
    if (!fullPhone) return { countryCode: "+591", phoneNumber: "" };

    // Si el teléfono tiene el formato +591-71890091
    const match = fullPhone.match(/^(\+\d+)-?(.+)$/);
    if (match) {
      return {
        countryCode: match[1],
        phoneNumber: match[2],
      };
    }

    // Si no tiene formato, asumir que es solo el número
    return {
      countryCode: "+591",
      phoneNumber: fullPhone,
    };
  };

  // Cargar servicios disponibles con búsqueda en tiempo real y paginación
  useEffect(() => {
    const loadServices = async (page = 1, isLoadMore = false) => {
      if (isLoadMore) {
        setLoadingMoreServices(true);
      } else {
        setLoadingServices(true);
        setCurrentServicePage(1);
        setAvailableServices([]);
        setHasMoreServices(true);
      }

      try {
        const result = await getServices(business?.id ?? "", {
          search: serviceSearch,
          page,
          pageSize: 10,
        });

        if (result.data) {
          if (isLoadMore) {
            setAvailableServices((prev) => [...prev, ...result.data!]);
          } else {
            setAvailableServices(result.data);
          }

          setTotalServicesCount(result.totalCount);
          setHasMoreServices(page < result.totalPages);
          setCurrentServicePage(page);
        }
      } catch (error) {
        console.error("Error loading services:", error);
      } finally {
        setLoadingServices(false);
        setLoadingMoreServices(false);
      }
    };

    if (business?.id) {
      loadServices(1, false);
    }
  }, [business?.id, serviceSearch]);

  // Función para cargar más servicios (scroll infinito)
  const loadMoreServices = async () => {
    if (!loadingMoreServices && hasMoreServices) {
      const nextPage = currentServicePage + 1;
      setLoadingMoreServices(true);

      try {
        const result = await getServices(business?.id ?? "", {
          search: serviceSearch,
          page: nextPage,
          pageSize: 10,
        });

        if (result.data) {
          setAvailableServices((prev) => [...prev, ...result.data!]);
          setTotalServicesCount(result.totalCount);
          setHasMoreServices(nextPage < result.totalPages);
          setCurrentServicePage(nextPage);
        }
      } catch (error) {
        console.error("Error loading more services:", error);
      } finally {
        setLoadingMoreServices(false);
      }
    }
  };

  // Cargar productos disponibles con búsqueda en tiempo real y paginación
  useEffect(() => {
    const loadProducts = async (page = 1, isLoadMore = false) => {
      if (isLoadMore) {
        setLoadingMoreProducts(true);
      } else {
        setLoadingProducts(true);
        setCurrentProductPage(1);
        setAvailableProducts([]);
        setHasMoreProducts(true);
      }

      try {
        const result = await getBusinessProducts(business?.id ?? "", {
          search: productSearch,
          page: page,
          pageSize: 10,
        });

        if (result.data) {
          if (isLoadMore) {
            setAvailableProducts((prev) => [...prev, ...result.data]);
          } else {
            setAvailableProducts(result.data);
          }

          setTotalProductsCount(result.totalCount);
          setHasMoreProducts(page < result.totalPages);
          setCurrentProductPage(page);
        }
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoadingProducts(false);
        setLoadingMoreProducts(false);
      }
    };

    if (business?.id) {
      loadProducts(1, false);
    }
  }, [business?.id, productSearch]);

  // Función para cargar más productos (scroll infinito)
  const loadMoreProducts = async () => {
    if (!loadingMoreProducts && hasMoreProducts) {
      const nextPage = currentProductPage + 1;
      setLoadingMoreProducts(true);

      try {
        const result = await getBusinessProducts(business?.id ?? "", {
          search: productSearch,
          page: nextPage,
          pageSize: 10,
        });

        if (result.data) {
          setAvailableProducts((prev) => [...prev, ...result.data]);
          setTotalProductsCount(result.totalCount);
          setHasMoreProducts(nextPage < result.totalPages);
          setCurrentProductPage(nextPage);
        }
      } catch (error) {
        console.error("Error loading more products:", error);
      } finally {
        setLoadingMoreProducts(false);
      }
    }
  };

  // Cargar datos del branch si está editando
  useEffect(() => {
    const loadBranchData = async () => {
      if (branch) {
        // Debug: Ver estructura completa del branch
        console.log("🏢 Branch completo recibido:", branch);

        // Actualizar branch local
        setLocalBranch(branch);

        // Parsear el teléfono del branch para separar código y número
        const { countryCode: parsedCountryCode, phoneNumber: parsedNumber } = parsePhoneNumber(
          branch.contact_info.phone,
        );
        setCountryCode(parsedCountryCode);
        setPhoneNumber(parsedNumber);

        // Cargar servicios seleccionados desde branch.services
        let serviceIds: string[] = [];
        if (branch.services && branch.services.length > 0) {
          serviceIds = branch.services.map((service) => service.id);
          setSelectedServices(serviceIds);
        } else {
          setSelectedServices([]);
        }

        // Cargar productos asignados a la sucursal
        const productsResult = await getLocationProducts(branch.id || "");
        if (productsResult.success && productsResult.data) {
          const productIds = productsResult.data.map((item: any) => item.product_id);
          setSelectedProducts(productIds);
        }

        setFormData({
          name: branch.name,
          address: branch.location.address,
          phone: branch.contact_info.phone,
          services: serviceIds, // Usar los IDs de servicios obtenidos
          coordinates: {
            lat: branch.location.latitude,
            lng: branch.location.longitude,
          },
        });

        // ✅ Cargar el schedule de la sucursal existente
        const branchScheduleData = (branch as any).schedule;
        if (branchScheduleData) {
          try {
            const branchSchedule = convertDBToUI(branchScheduleData);
            setSchedule(branchSchedule);
          } catch (error) {
            console.error("❌ Error al convertir schedule de la sucursal:", error);
            console.error("📄 Schedule data que causó el error:", branchScheduleData);
            // Fallback al schedule por defecto si hay error
            setSchedule([...mockDefaultSchedule]);
          }
        } else {
          // Si no hay schedule, usar el por defecto
          setSchedule([...mockDefaultSchedule]);
        }
      } else {
        // Modo creación nueva - resetear todo
        setLocalBranch(null);
        setSelectedServices([]);
        setPhoneNumber("");
        setCountryCode("+591");
        setFormData({
          name: "",
          address: "",
          phone: "",
          services: [],
          coordinates: { lat: 0, lng: 0 },
        });
        setSchedule([...mockDefaultSchedule]);
      }
    };

    loadBranchData();
  }, [branch]);

  const handleLocationSelect = (location: { lat: number; lng: number; address: string }) => {
    setFormData({
      ...formData,
      coordinates: { lat: location.lat, lng: location.lng },
      address: location.address,
    });
  };

  // Los servicios ya vienen filtrados desde el servidor
  const filteredServices = availableServices;

  const handleServiceToggle = async (serviceId: string) => {
    const isSelected = selectedServices.includes(serviceId);

    // Actualizar UI inmediatamente (optimistic update)
    const newServices = isSelected
      ? selectedServices.filter((s) => s !== serviceId)
      : [...selectedServices, serviceId];

    setSelectedServices(newServices);
    setFormData((prev) => ({ ...prev, services: newServices }));

    // Si estamos editando (branch existe), sincronizar con base de datos en background
    if (branch?.id && localBranch) {
      try {
        if (isSelected) {
          // Actualizar branch local inmediatamente
          const updatedBranch: Branch = {
            ...localBranch,
            services: localBranch.services?.filter((service) => service.id !== serviceId) || [],
          };
          setLocalBranch(updatedBranch);

          // Notificar al componente padre inmediatamente
          if (onBranchUpdate) {
            onBranchUpdate(updatedBranch);
          }

          // Ejecutar operación en BD en background
          const result = await removeServiceFromBranch(branch.id, serviceId);

          if (result.success) {
            toast.success("Servicio removido de la sucursal");
          } else {
            // Si falla, revertir cambios
            setSelectedServices((prevServices) => [...prevServices, serviceId]);
            setFormData((prev) => ({
              ...prev,
              services: [...prev.services, serviceId],
            }));

            // Revertir branch local
            const revertedBranch: Branch = {
              ...localBranch,
              services: [
                ...(localBranch.services || []),
                localBranch.services?.find((s) => s.id === serviceId) || {
                  id: serviceId,
                  name: "Unknown",
                  price: 0,
                  duration: 0,
                },
              ],
            };
            setLocalBranch(revertedBranch);

            if (onBranchUpdate) {
              onBranchUpdate(revertedBranch);
            }

            toast.error(result.error || "Error al quitar el servicio");
          }
        } else {
          // Buscar el servicio completo en availableServices
          const serviceToAdd = availableServices.find((service) => service.id === serviceId);

          if (serviceToAdd) {
            // Mapear Service a formato Branch.services
            const mappedService = {
              id: serviceToAdd.id,
              name: serviceToAdd.name,
              price:
                typeof serviceToAdd.price === "object"
                  ? serviceToAdd.price.value / 100
                  : serviceToAdd.price / 100,
              duration: serviceToAdd.duration || 0,
            };

            // Actualizar branch local inmediatamente
            const updatedBranch: Branch = {
              ...localBranch,
              services: [...(localBranch.services || []), mappedService],
            };
            setLocalBranch(updatedBranch);

            // Notificar al componente padre inmediatamente
            if (onBranchUpdate) {
              onBranchUpdate(updatedBranch);
            }

            // Ejecutar operación en BD en background
            const result = await addServiceToBranch(branch.id, serviceId);

            if (result.success) {
              toast.success("Servicio agregado a la sucursal");
            } else {
              // Si falla, revertir cambios
              setSelectedServices((prevServices) => prevServices.filter((s) => s !== serviceId));
              setFormData((prev) => ({
                ...prev,
                services: prev.services.filter((s) => s !== serviceId),
              }));

              // Revertir branch local
              const revertedBranch: Branch = {
                ...localBranch,
                services: localBranch.services?.filter((service) => service.id !== serviceId) || [],
              };
              setLocalBranch(revertedBranch);

              if (onBranchUpdate) {
                onBranchUpdate(revertedBranch);
              }

              toast.error(result.error || "Error al agregar el servicio");
            }
          }
        }
      } catch (error) {
        toast.error("Error al actualizar el servicio");
        console.error("Error updating service:", error);

        // Revertir cambios en caso de error
        setSelectedServices(
          isSelected
            ? [...selectedServices, serviceId]
            : selectedServices.filter((s) => s !== serviceId),
        );
        setFormData((prev) => ({
          ...prev,
          services: isSelected
            ? [...prev.services, serviceId]
            : prev.services.filter((s) => s !== serviceId),
        }));
      }
    }
  };

  const areAllServicesSelected = !branch
    ? totalServicesCount > 0 && selectedServices.length === totalServicesCount
    : availableServices.length > 0 && selectedServices.length === availableServices.length;

  const areAllProductsSelected = !branch
    ? totalProductsCount > 0 && selectedProducts.length === totalProductsCount
    : availableProducts.length > 0 && selectedProducts.length === availableProducts.length;

  const handleToggleAllServices = async () => {
    if (areAllServicesSelected) {
      console.log("🔄 Deselecting all services");
      setSelectedServices([]);
      setFormData((prev) => ({ ...prev, services: [] }));
      return;
    }

    if (branch) {
      const allServiceIds = availableServices.map((service) => service.id);
      console.log("🔄 Selecting all services:", allServiceIds);
      setSelectedServices(allServiceIds);
      setFormData((prev) => ({ ...prev, services: allServiceIds }));
      return;
    }

    if (!business?.id || selectingAllServices) return;

    setSelectingAllServices(true);
    try {
      const pageSize = 200;
      let page = 1;
      let totalPages = 1;
      const allIds: string[] = [];

      do {
        const result = await getServices(business.id, {
          page,
          pageSize,
        });

        if (result.data) {
          allIds.push(...result.data.map((s) => s.id));
        }

        totalPages = result.totalPages || 1;
        page += 1;
      } while (page <= totalPages);

      const uniqueIds = Array.from(new Set(allIds));
      setSelectedServices(uniqueIds);
      setFormData((prev) => ({ ...prev, services: uniqueIds }));
    } catch (error) {
      console.error("Error selecting all services:", error);
      toast.error("Error al seleccionar todos los servicios");
    } finally {
      setSelectingAllServices(false);
    }
  };

  const handleToggleAllProducts = async () => {
    if (areAllProductsSelected) {
      console.log("🔄 Deselecting all products");
      setSelectedProducts([]);
      return;
    }

    if (branch) {
      const allProductIds = availableProducts.map((product) => product.id);
      console.log("🔄 Selecting all products:", allProductIds);
      setSelectedProducts(allProductIds);
      return;
    }

    if (!business?.id || selectingAllProducts) return;

    setSelectingAllProducts(true);
    try {
      const pageSize = 200;
      let page = 1;
      let totalPages = 1;
      const allIds: string[] = [];

      do {
        const result = await getBusinessProducts(business.id, {
          page,
          pageSize,
        });

        if (result.data) {
          allIds.push(...result.data.map((p: any) => p.id));
        }

        totalPages = result.totalPages || 1;
        page += 1;
      } while (page <= totalPages);

      const uniqueIds = Array.from(new Set(allIds));
      setSelectedProducts(uniqueIds);
    } catch (error) {
      console.error("Error selecting all products:", error);
      toast.error("Error al seleccionar todos los productos");
    } finally {
      setSelectingAllProducts(false);
    }
  };

  // Funciones de navegación entre tabs
  const goToNextTab = () => {
    if (activeTab === "basico") {
      // Validar campos básicos antes de continuar
      if (!formData.name.trim()) {
        toast.error("Por favor ingresa el nombre de la sucursal antes de continuar");
        return;
      }
      if (!formData.address.trim()) {
        toast.error("Por favor ingresa la dirección antes de continuar");
        return;
      }
      setActiveTab("servicios");
    } else if (activeTab === "servicios") {
      setActiveTab("productos");
    } else if (activeTab === "productos") {
      setActiveTab("disponibilidad");
    }
  };

  const goToPreviousTab = () => {
    if (activeTab === "servicios") {
      setActiveTab("basico");
    } else if (activeTab === "productos") {
      setActiveTab("servicios");
    } else if (activeTab === "disponibilidad") {
      setActiveTab("productos");
    }
  };

  // Funciones para manejar disponibilidad
  const toggleDay = (index: number) => {
    const newSchedule = [...schedule];
    const wasEnabled = newSchedule[index].enabled;
    newSchedule[index].enabled = !wasEnabled;

    // Si se está activando el día, establecer horario por defecto
    if (!wasEnabled) {
      newSchedule[index].startHour = "08";
      newSchedule[index].startMinute = "00";
      newSchedule[index].endHour = "20";
      newSchedule[index].endMinute = "00";
      newSchedule[index].breaks = [];
    }

    setSchedule(newSchedule);
  };

  const updateTime = (index: number, field: keyof DaySchedule, value: string) => {
    const newSchedule = [...schedule];
    (newSchedule[index] as any)[field] = value;
    setSchedule(newSchedule);
  };

  const copyToAll = (index: number) => {
    const source = schedule[index];
    const newSchedule = schedule.map((day) => ({
      ...day,
      enabled: source.enabled,
      startHour: source.startHour,
      startMinute: source.startMinute,
      endHour: source.endHour,
      endMinute: source.endMinute,
      breaks: source.breaks.map((b) => ({ ...b })),
    }));
    setSchedule(newSchedule);
  };

  const addBreak = (dayIndex: number) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].breaks.push({
      startHour: "12",
      startMinute: "00",
      endHour: "15",
      endMinute: "00",
    });
    setSchedule(newSchedule);
  };

  const removeBreak = (dayIndex: number, breakIndex: number) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].breaks.splice(breakIndex, 1);
    setSchedule(newSchedule);
  };

  const updateBreak = (
    dayIndex: number,
    breakIndex: number,
    field: keyof BreakTime,
    value: string,
  ) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].breaks[breakIndex][field] = value;
    setSchedule(newSchedule);
  };

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.address.trim()) {
      toast.error("Por favor completa los campos requeridos");
      setActiveTab("basico");
      return;
    }

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    // Combinar código de país con número de teléfono
    const fullPhone = phoneNumber ? `${countryCode}-${phoneNumber}` : "";

    // Convertir schedule de UI a formato DB y agregarlo al formData
    const scheduleDB = convertUIToDB(schedule);
    const dataToSave = {
      ...formData,
      phone: fullPhone,
      schedule: scheduleDB,
      services: selectedServices, // Asegurar que los servicios actuales estén incluidos
    };

    console.log("📤 Submitting branch data:", {
      ...dataToSave,
      servicesCount: selectedServices.length,
      selectedServices,
      productsCount: selectedProducts.length,
      selectedProducts,
    });

    try {
      onSave(dataToSave, selectedProducts);
    } finally {
      // Reset isSubmitting después de un delay para permitir que el modal se cierre
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
    }
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="flex h-full min-h-0 w-full flex-col overflow-hidden"
    >
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="basico" data-branch-tab-basico>
          Información Básica
        </TabsTrigger>
        <TabsTrigger
          value="servicios"
          disabled={!formData.name.trim() || !formData.address.trim()}
          className={
            !formData.name.trim() || !formData.address.trim() ? "cursor-not-allowed opacity-50" : ""
          }
        >
          Servicios
        </TabsTrigger>
        <TabsTrigger
          value="productos"
          disabled={!formData.name.trim() || !formData.address.trim()}
          className={
            !formData.name.trim() || !formData.address.trim() ? "cursor-not-allowed opacity-50" : ""
          }
        >
          Productos
        </TabsTrigger>
        <TabsTrigger
          value="disponibilidad"
          disabled={!formData.name.trim() || !formData.address.trim()}
          className={
            !formData.name.trim() || !formData.address.trim() ? "cursor-not-allowed opacity-50" : ""
          }
        >
          Disponibilidad
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="basico"
        className="mt-3 flex-1 space-y-4 overflow-y-auto pr-2"
        data-branch-basico-section
      >
        <div className="space-y-4">
          {/* Name */}
          <div className="space-y-2" data-branch-name>
            <Label htmlFor="name" className="text-sm">
              Nombre de la Sucursal *
            </Label>
            <Input
              id="name"
              data-cy="branch-name-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Nombre de la sucursal"
              required
            />
          </div>

          {/* LocationPicker */}
          <div className="space-y-2" data-branch-location>
            {mapError && (
              <div className="bg-destructive/10 text-destructive rounded-lg border border-red-300 p-3 text-sm">
                {mapError}
              </div>
            )}
            {apiKey ? (
              <LocationPicker
                userLocation={
                  formData.coordinates.lat !== 0 && formData.coordinates.lng !== 0
                    ? { lat: formData.coordinates.lat, lng: formData.coordinates.lng }
                    : null
                }
                address={formData.address}
                onAddressChange={handleAddressChange}
                onLocationChange={handleLocationChange}
              />
            ) : (
              <div className="bg-muted flex h-[200px] w-full items-center justify-center rounded-lg border">
                <div className="text-muted-foreground text-center">
                  <MapPin className="mx-auto mb-1 h-8 w-8" />
                  <p className="text-xs">Google Maps API Key requerida</p>
                  <p className="text-xs">Agrega NEXT_PUBLIC_GOOGLE_MAPS_API_KEY al .env</p>
                </div>
              </div>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label className="text-sm">Teléfono/Celular</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1" data-phone-country-code>
                <Label htmlFor="countryCode" className="text-muted-foreground text-xs">
                  Código de País
                </Label>
                <Select value={countryCode} onValueChange={setCountryCode}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+591">🇧🇴 Bolivia (+591)</SelectItem>
                    <SelectItem value="+54">🇦🇷 Argentina (+54)</SelectItem>
                    <SelectItem value="+56">🇨🇱 Chile (+56)</SelectItem>
                    <SelectItem value="+57">🇨🇴 Colombia (+57)</SelectItem>
                    <SelectItem value="+51">🇵🇪 Perú (+51)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1" data-phone-number>
                <Label htmlFor="phone" className="text-muted-foreground text-xs">
                  Número
                </Label>
                <Input
                  id="phone"
                  data-cy="branch-phone-input"
                  type="tel"
                  placeholder="71890091"
                  value={phoneNumber}
                  onChange={(e) => {
                    // Solo permitir números
                    const value = e.target.value.replace(/\D/g, "");
                    setPhoneNumber(value);
                  }}
                  maxLength={15}
                  className="h-9 text-sm"
                />
              </div>
            </div>
            <p className="text-muted-foreground text-xs">Solo el número, sin código de país</p>
            {phoneNumber && (
              <p className="text-xs font-medium text-green-600">
                Se guardará como: {countryCode}-{phoneNumber}
              </p>
            )}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="servicios" className="mt-3 flex min-h-0 flex-1 flex-col pr-2">
        <div className="flex min-h-0 flex-1 flex-col space-y-4" data-branch-services>
          <div>
            <Label className="text-sm">Servicios disponibles en la sucursal</Label>
            {branch && (
              <p className="text-muted-foreground mt-1 text-xs">
                Los cambios se aplican inmediatamente al seleccionar/deseleccionar
              </p>
            )}
          </div>
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-md border">
            {/* Search */}
            <div className="bg-muted/30 border-b p-3">
              <div className="relative">
                <Search className="text-muted-foreground absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
                <Input
                  placeholder="Buscar servicios..."
                  value={serviceSearch}
                  onChange={(e) => setServiceSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            {/* Services List */}
            <div
              className="flex-1 overflow-auto p-3"
              onScroll={(e) => {
                const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
                if (scrollHeight - scrollTop <= clientHeight + 100) {
                  loadMoreServices();
                }
              }}
            >
              {loadingServices ? (
                <div className="text-muted-foreground py-8 text-center">Cargando servicios...</div>
              ) : filteredServices.length === 0 ? (
                <div className="text-muted-foreground py-8 text-center">
                  {serviceSearch ? "No se encontraron servicios" : "No hay servicios disponibles"}
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Checkbox para seleccionar todos - Solo en modo CREATE */}
                  {!branch && (
                    <div className="mb-3 flex items-center space-x-3 border-b p-2 pb-3">
                      <Checkbox
                        id="select-all-services"
                        checked={areAllServicesSelected}
                        onCheckedChange={handleToggleAllServices}
                        disabled={selectingAllServices || totalServicesCount === 0}
                        data-branch-check
                      />
                      <Label
                        htmlFor="select-all-services"
                        className="flex-1 cursor-pointer font-medium"
                      >
                        <div className="flex items-center justify-between">
                          <span>
                            {areAllServicesSelected ? "Deseleccionar todos" : "Seleccionar todos"}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            {selectedServices.length} de {totalServicesCount} seleccionados
                          </span>
                        </div>
                      </Label>
                    </div>
                  )}

                  {/* Lista de servicios individuales */}
                  {filteredServices.map((service) => {
                    const isServiceSelected = selectedServices.includes(service.id);

                    return (
                      <div
                        key={service.id}
                        className="hover:bg-muted/50 flex items-center space-x-3 rounded p-2"
                      >
                        <Checkbox
                          id={`service-${service.id}`}
                          checked={isServiceSelected}
                          onCheckedChange={() => handleServiceToggle(service.id)}
                        />
                        <Label
                          htmlFor={`service-${service.id}`}
                          className="flex-1 cursor-pointer font-normal"
                        >
                          <div className="flex items-center justify-between">
                            <span>{service.name}</span>
                            {service.price && (
                              <span className="text-muted-foreground text-sm">
                                {service.price.currency === "BOB" ? "Bs." : service.price.currency}{" "}
                                {(service.price.value / 100).toFixed(2)}
                              </span>
                            )}
                          </div>
                        </Label>
                      </div>
                    );
                  })}

                  {loadingMoreServices && (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      <span className="text-muted-foreground text-sm">
                        Cargando más servicios...
                      </span>
                    </div>
                  )}

                  {!hasMoreServices && availableServices.length > 0 && (
                    <div className="py-4 text-center">
                      <span className="text-muted-foreground text-xs">
                        {availableServices.length} de {totalServicesCount} servicios mostrados
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Selected count and total info */}
            <div className="bg-muted/30 text-muted-foreground border-t p-3 text-sm">
              <div className="flex items-center justify-between">
                <div>
                  {selectedServices.length > 0 && (
                    <span>
                      {selectedServices.length} servicio{selectedServices.length !== 1 ? "s" : ""}{" "}
                      seleccionado{selectedServices.length !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>
                <div>
                  {totalServicesCount > 0 && (
                    <span className="text-xs">
                      Mostrando {availableServices.length} de {totalServicesCount} servicios
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="productos" className="mt-3 flex min-h-0 flex-1 flex-col pr-2">
        <div className="flex min-h-0 flex-1 flex-col space-y-4" data-branch-products>
          <div>
            <Label className="text-sm">Productos disponibles en la sucursal</Label>
            {branch && (
              <p className="text-muted-foreground mt-1 text-xs">
                Los cambios se aplican inmediatamente al seleccionar/deseleccionar
              </p>
            )}
          </div>
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-md border">
            {/* Search */}
            <div className="bg-muted/30 border-b p-3">
              <div className="relative">
                <Search className="text-muted-foreground absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
                <Input
                  placeholder="Buscar productos..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            {/* Products List */}
            <div
              className="flex-1 overflow-auto p-3"
              onScroll={(e) => {
                const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
                // Detectar cuando está cerca del final (100px antes del final)
                if (scrollHeight - scrollTop <= clientHeight + 100) {
                  loadMoreProducts();
                }
              }}
            >
              {loadingProducts ? (
                <div className="text-muted-foreground py-8 text-center">Cargando productos...</div>
              ) : availableProducts.length === 0 ? (
                <div className="text-muted-foreground py-8 text-center">
                  {productSearch
                    ? "No se encontraron productos"
                    : "No hay productos disponibles. Crea productos en Administración > Productos"}
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Seleccionar Todos - Solo en modo creación */}
                  {!branch && (
                    <div className="flex items-center space-x-3 rounded-lg border border-dashed p-3">
                      <Checkbox
                        id="selectAllProducts"
                        checked={areAllProductsSelected}
                        onCheckedChange={handleToggleAllProducts}
                        disabled={selectingAllProducts || totalProductsCount === 0}
                        data-branch-product-check
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor="selectAllProducts"
                          className="cursor-pointer text-sm font-medium"
                        >
                          Seleccionar Todos los Productos
                        </Label>
                        <p className="text-muted-foreground text-xs">
                          Activa esta opción para asignar todos los productos a esta sucursal
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Lista de productos */}
                  {availableProducts.map((product) => {
                    const isProductSelected = selectedProducts.includes(product.id);

                    return (
                      <div
                        key={product.id}
                        className="hover:bg-muted/50 flex items-center space-x-3 rounded p-2"
                      >
                        <Checkbox
                          id={`product-${product.id}`}
                          checked={isProductSelected}
                          onCheckedChange={async () => {
                            if (branch?.id) {
                              const isSelected = selectedProducts.includes(product.id);
                              if (isSelected) {
                                const result = await removeProductFromLocation(
                                  product.id,
                                  branch.id,
                                );
                                if (result.success) {
                                  setSelectedProducts((prev) =>
                                    prev.filter((id) => id !== product.id),
                                  );
                                  toast.success("Producto removido de la sucursal");
                                } else {
                                  toast.error(result.error || "Error al remover el producto");
                                }
                              } else {
                                const result = await assignProductToLocation(product.id, branch.id);
                                if (result.success) {
                                  setSelectedProducts((prev) => [...prev, product.id]);
                                  toast.success("Producto agregado a la sucursal");
                                } else {
                                  toast.error(result.error || "Error al agregar el producto");
                                }
                              }
                            } else {
                              // Modo creación
                              setSelectedProducts((prev) =>
                                isProductSelected
                                  ? prev.filter((id) => id !== product.id)
                                  : [...prev, product.id],
                              );
                            }
                          }}
                        />
                        <Label
                          htmlFor={`product-${product.id}`}
                          className="flex-1 cursor-pointer font-normal"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {product.image ? (
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="h-10 w-10 rounded object-cover"
                                />
                              ) : (
                                <div className="bg-muted text-muted-foreground flex h-10 w-10 items-center justify-center rounded text-xs">
                                  Sin img
                                </div>
                              )}
                              <span>{product.name}</span>
                            </div>
                            {product.price && (
                              <span className="text-muted-foreground text-sm">
                                {product.price.currency === "BOB" ? "Bs." : product.price.currency}{" "}
                                {(product.price.value / 100).toFixed(2)}
                              </span>
                            )}
                          </div>
                        </Label>
                      </div>
                    );
                  })}

                  {/* Loading more indicator */}
                  {loadingMoreProducts && (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      <span className="text-muted-foreground text-sm">
                        Cargando más productos...
                      </span>
                    </div>
                  )}

                  {/* End of list indicator */}
                  {!hasMoreProducts && availableProducts.length > 0 && (
                    <div className="py-4 text-center">
                      <span className="text-muted-foreground text-xs">
                        {availableProducts.length} de {totalProductsCount} productos mostrados
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Selected count and total info */}
            <div className="bg-muted/30 text-muted-foreground border-t p-3 text-sm">
              <div className="flex items-center justify-between">
                <div>
                  {selectedProducts.length > 0 && (
                    <span>
                      {selectedProducts.length} producto{selectedProducts.length !== 1 ? "s" : ""}{" "}
                      seleccionado{selectedProducts.length !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>
                <div>
                  {totalProductsCount > 0 && (
                    <span className="text-xs">
                      Mostrando {availableProducts.length} de {totalProductsCount} productos
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="disponibilidad" className="mt-3 flex-1 space-y-4 overflow-y-auto pr-2">
        <div className="space-y-4" data-branch-disponibilidad>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Horario de Disponibilidad</h3>
              <p className="text-muted-foreground text-sm">
                Configura los días y horarios de atención de la sucursal
              </p>
            </div>
          </div>

          {/* Schedule Table */}
          <div className="bg-card rounded-lg border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[120px]">Día</TableHead>
                  <TableHead className="min-w-[100px]">Estado</TableHead>
                  <TableHead className="min-w-[180px]">Inicio de jornada</TableHead>
                  <TableHead className="min-w-[180px]">Fin de jornada</TableHead>
                  <TableHead className="min-w-[200px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedule.map((day, index) => (
                  <>
                    <TableRow
                      key={day.day}
                      className="hover:bg-muted/30 transition-colors"
                      data-branch-table-row
                    >
                      <TableCell className="font-medium">{day.day}</TableCell>
                      <TableCell>
                        <div className="flex items-center" data-branch-table-switch>
                          <Switch checked={day.enabled} onCheckedChange={() => toggleDay(index)} />
                          <span className="text-muted-foreground ml-2 text-sm">
                            {day.enabled ? "Activo" : "Cerrado"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {day.enabled ? (
                          <div className="flex gap-2" data-branch-hour-start>
                            <Select
                              value={day.startHour}
                              onValueChange={(value) => updateTime(index, "startHour", value)}
                            >
                              <SelectTrigger className="w-22">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="max-h-[350px] overflow-y-auto">
                                {HOURS.map((hour) => (
                                  <SelectItem key={hour} value={hour}>
                                    {formatHourWithAmPm(hour)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <span className="flex items-center">:</span>
                            <Select
                              value={day.startMinute}
                              onValueChange={(value) => updateTime(index, "startMinute", value)}
                            >
                              <SelectTrigger className="w-20">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="max-h-[350px] overflow-y-auto">
                                {MINUTES.map((minute) => (
                                  <SelectItem key={minute} value={minute}>
                                    {minute}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Cerrado</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {day.enabled ? (
                          <div className="flex gap-2" data-branch-hour-end>
                            <Select
                              value={day.endHour}
                              onValueChange={(value) => updateTime(index, "endHour", value)}
                            >
                              <SelectTrigger className="w-22">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="max-h-[350px] overflow-y-auto">
                                {HOURS.map((hour) => (
                                  <SelectItem key={hour} value={hour}>
                                    {formatHourWithAmPm(hour)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <span className="flex items-center">:</span>
                            <Select
                              value={day.endMinute}
                              onValueChange={(value) => updateTime(index, "endMinute", value)}
                            >
                              <SelectTrigger className="w-20">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="max-h-[350px] overflow-y-auto">
                                {MINUTES.map((minute) => (
                                  <SelectItem key={minute} value={minute}>
                                    {minute}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Cerrado</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2" data-branch-descanso>
                          {day.enabled && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => addBreak(index)}
                              disabled={day.breaks.length >= 1}
                              className={
                                day.breaks.length >= 1 ? "cursor-not-allowed opacity-50" : ""
                              }
                              title={
                                day.breaks.length >= 1
                                  ? "Solo se permite un descanso por día"
                                  : "Agregar descanso"
                              }
                            >
                              <Plus className="mr-1 h-4 w-4" />
                              Descanso
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => copyToAll(index)}
                            title="Copiar a todos los días"
                            data-branch-copy
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    {/* Breaks rows */}
                    {day.breaks.map((breakTime, breakIndex) => (
                      <TableRow key={`${day.day}-break-${breakIndex}`} className="bg-muted/20">
                        <TableCell className="text-muted-foreground pl-8 text-sm">
                          Descanso {breakIndex + 1}
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Select
                              value={breakTime.startHour}
                              onValueChange={(value) =>
                                updateBreak(index, breakIndex, "startHour", value)
                              }
                            >
                              <SelectTrigger className="w-20">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="max-h-[200px] overflow-y-auto">
                                {HOURS.map((hour) => (
                                  <SelectItem key={hour} value={hour}>
                                    {formatHourWithAmPm(hour)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <span className="flex items-center">:</span>
                            <Select
                              value={breakTime.startMinute}
                              onValueChange={(value) =>
                                updateBreak(index, breakIndex, "startMinute", value)
                              }
                            >
                              <SelectTrigger className="w-20">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="max-h-[200px] overflow-y-auto">
                                {MINUTES.map((minute) => (
                                  <SelectItem key={minute} value={minute}>
                                    {minute}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Select
                              value={breakTime.endHour}
                              onValueChange={(value) =>
                                updateBreak(index, breakIndex, "endHour", value)
                              }
                            >
                              <SelectTrigger className="w-20">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="max-h-[200px] overflow-y-auto">
                                {HOURS.map((hour) => (
                                  <SelectItem key={hour} value={hour}>
                                    {formatHourWithAmPm(hour)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <span className="flex items-center">:</span>
                            <Select
                              value={breakTime.endMinute}
                              onValueChange={(value) =>
                                updateBreak(index, breakIndex, "endMinute", value)
                              }
                            >
                              <SelectTrigger className="w-20">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="max-h-[200px] overflow-y-auto">
                                {MINUTES.map((minute) => (
                                  <SelectItem key={minute} value={minute}>
                                    {minute}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 transition-all"
                            onClick={() => removeBreak(index, breakIndex)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </TabsContent>

      <div className="sticky bottom-0 mt-4 flex shrink-0 justify-between gap-3 border-t bg-white pt-4">
        <div className="flex gap-3">
          <Button variant="outline" onClick={onCancel} data-cy="branch-form-cancel">
            Cancelar
          </Button>
        </div>

        <div className="flex gap-3">
          {activeTab !== "basico" && (
            <Button variant="outline" onClick={goToPreviousTab}>
              Anterior
            </Button>
          )}
          {activeTab === "basico" && (
            <Button data-branch-btnnext onClick={goToNextTab}>
              Siguiente
            </Button>
          )}
          {activeTab === "servicios" && (
            <Button data-branch-btnnext-services onClick={goToNextTab}>
              Siguiente
            </Button>
          )}
          {activeTab === "productos" && (
            <Button data-branch-btnnext-productos onClick={goToNextTab}>
              Siguiente
            </Button>
          )}
          {activeTab === "disponibilidad" && (
            <Button
              data-cy="branch-form-submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              data-branch-btnnext-disponibilidad
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {branch ? "Actualizar" : "Crear"} Sucursal
            </Button>
          )}
        </div>
      </div>
    </Tabs>
  );
}
