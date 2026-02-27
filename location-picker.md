"use client";

import { memo, useEffect, useRef, useState } from "react";
import { Input } from "@/shared/ui";
import { MapPin } from "lucide-react";

interface LocationPickerProps {
  userLocation: { lat: number; lng: number } | null;
  address: string;
  onAddressChange: (newAddress: string) => void;
  onLocationChange: (location: { lat: number; lng: number }) => void;
}

export const LocationPicker = memo(function LocationPicker({
  userLocation,
  address,
  onAddressChange,
  onLocationChange,
}: LocationPickerProps) {
  const [_isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const initialLoadRef = useRef<boolean>(true);
  const lastPositionRef = useRef<{ lat: number; lng: number } | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  // Obtener ubicación del usuario si no hay una definida
  useEffect(() => {
    if (!userLocation && "geolocation" in navigator && initialLoadRef.current) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const coords = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              lastPositionRef.current = coords;
              onLocationChange(coords);
              onAddressChange(`${coords.lat}, ${coords.lng}`);
            },
            () => setMapError("No se pudo obtener la ubicación."),
          );
        } else {
          setMapError("El acceso a la ubicación está bloqueado. Puedes usar el buscador.");
        }
      });
    }
    initialLoadRef.current = false;
  }, [userLocation, onAddressChange, onLocationChange]);

  // Función para aplicar estilos al contenedor de autocompletado
  const setupPacContainerStyles = () => {
    // Observar el DOM para detectar cuando aparece el contenedor de autocompletado
    const observer = new MutationObserver((_mutations, obs) => {
      const pacContainer = document.querySelector(".pac-container");
      if (pacContainer) {
        // Aplicar estilos críticos al contenedor de autocompletado
        const pacContainerEl = pacContainer as HTMLElement;
        pacContainerEl.style.zIndex = "10000";
        pacContainerEl.style.position = "absolute";
        pacContainerEl.style.width = inputRef.current?.offsetWidth + "px";
        pacContainerEl.style.marginTop = "0";
        pacContainerEl.style.pointerEvents = "auto";

        // Asegurar que los elementos dentro también sean interactivos
        const pacItems = pacContainerEl.querySelectorAll(".pac-item");
        pacItems.forEach((item) => {
          (item as HTMLElement).style.pointerEvents = "auto";
          (item as HTMLElement).style.cursor = "pointer";
        });

        obs.disconnect(); // Dejar de observar una vez que hemos encontrado y modificado
      }
    });

    // Comenzar a observar el documento
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return observer;
  };

  // Inicializar el autocompletado cuando el input está disponible
  useEffect(() => {
    const initAutocomplete = () => {
      if (typeof window === "undefined" || !window.google?.maps?.places) return;

      const addressInput = document.getElementById("address-input") as HTMLInputElement;
      if (addressInput && !autocompleteRef.current) {
        inputRef.current = addressInput;
        const autocomplete = new google.maps.places.Autocomplete(addressInput, {
          fields: ["formatted_address", "geometry"],
        });

        autocompleteRef.current = autocomplete;

        // Configurar un observador para modificar el contenedor de autocompletado
        const observer = setupPacContainerStyles();

        // Cuando el input obtiene el foco
        addressInput.addEventListener("focus", () => {
          setIsSearching(true);
          // Deshabilitar completamente el mapa mientras se busca
          if (mapContainerRef.current) {
            mapContainerRef.current.style.pointerEvents = "none";
          }
          // Volver a aplicar los estilos al contenedor de autocompletado por si acaso
          setupPacContainerStyles();
        });

        // Cuando el input pierde el foco
        addressInput.addEventListener("blur", () => {
          // Usar un timeout para permitir que se complete el clic en una sugerencia
          setTimeout(() => {
            setIsSearching(false);
            // Rehabilitar el mapa
            if (mapContainerRef.current) {
              mapContainerRef.current.style.pointerEvents = "auto";
            }
          }, 300);
        });

        google.maps.event.addListener(autocomplete, "place_changed", () => {
          const place = autocomplete.getPlace();
          if (place?.geometry?.location && place.formatted_address) {
            const newPosition = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            };
            lastPositionRef.current = newPosition;

            if (mapRef.current) {
              mapRef.current.setCenter(place.geometry.location);
            }

            if (markerRef.current) {
              markerRef.current.setPosition(place.geometry.location);
            }

            // Usar setTimeout para asegurar que los callbacks se ejecuten después de que
            // el evento de clic en el autocomplete se haya procesado completamente
            setTimeout(() => {
              onAddressChange(place.formatted_address!);
              onLocationChange(newPosition);

              // Rehabilitar el mapa después de seleccionar lugar
              setIsSearching(false);
              if (mapContainerRef.current) {
                mapContainerRef.current.style.pointerEvents = "auto";
              }

              // Quitar el foco del input para cerrar el dropdown
              if (inputRef.current) {
                inputRef.current.blur();
              }
            }, 50);
          }
        });

        // Limpiar el observador al desmontar
        return () => observer.disconnect();
      }
    };

    // Esperar a que Google Maps esté listo
    if (window.google?.maps?.places) {
      initAutocomplete();
    } else {
      const checkInterval = setInterval(() => {
        if (window.google?.maps?.places) {
          clearInterval(checkInterval);
          initAutocomplete();
        }
      }, 500);
      return () => clearInterval(checkInterval);
    }
  }, [onAddressChange, onLocationChange]);

  // Inicializar mapa cuando la ubicación está lista
  useEffect(() => {
    const initMap = async () => {
      if (!userLocation) return;

      // Almacenar la ubicación actual como referencia
      lastPositionRef.current = userLocation;

      if (typeof window !== "undefined" && window.google?.maps) {
        try {
          const { Map } = (await window.google.maps.importLibrary("maps")) as any;
          const { Marker } = (await window.google.maps.importLibrary("marker")) as any;
          const geocoder = new google.maps.Geocoder();

          const mapElement = document.getElementById("map");

          if (mapElement) {
            // Configuración del mapa
            if (!mapRef.current) {
              const map = new Map(mapElement, {
                center: userLocation,
                zoom: 15,
                disableDefaultUI: true,
                zoomControl: true,
                streetViewControl: false,
                fullscreenControl: true,
              });
              mapRef.current = map;
            } else {
              // Solo actualizar el centro si es significativamente diferente
              const currentCenter = mapRef.current.getCenter();
              if (
                currentCenter &&
                (Math.abs(currentCenter.lat() - userLocation.lat) > 0.0001 ||
                  Math.abs(currentCenter.lng() - userLocation.lng) > 0.0001)
              ) {
                mapRef.current.setCenter(userLocation);
              }
            }

            // Configuración del marcador
            if (!markerRef.current) {
              const marker = new Marker({
                position: userLocation,
                map: mapRef.current,
                draggable: true,
                title: "Ubicación de la sucursal",
              });
              markerRef.current = marker;

              // Evento: Arrastrar el marcador
              marker.addListener("dragend", async () => {
                const position = marker.getPosition();
                if (position) {
                  const newPosition = { lat: position.lat(), lng: position.lng() };
                  lastPositionRef.current = newPosition;
                  try {
                    const response = await geocoder.geocode({ location: position });
                    if (response.results[0]) {
                      const newAddress = response.results[0].formatted_address;
                      onAddressChange(newAddress);
                      if (inputRef.current) {
                        inputRef.current.value = newAddress;
                      }
                      onLocationChange(newPosition);
                    }
                  } catch {
                    console.error("Error al geocodificar.");
                    // Aunque haya error en geocodificar, actualizamos las coordenadas
                    onLocationChange(newPosition);
                  }
                }
              });
            } else {
              // Solo actualizar la posición del marcador si es significativamente diferente
              const currentPosition = markerRef.current.getPosition();
              if (
                currentPosition &&
                (Math.abs(currentPosition.lat() - userLocation.lat) > 0.0001 ||
                  Math.abs(currentPosition.lng() - userLocation.lng) > 0.0001)
              ) {
                markerRef.current.setPosition(userLocation);
              }
            }

            // Evento: Doble clic en el mapa para seleccionar ubicación
            if (mapRef.current) {
              // Evitar agregar múltiples listeners para el mismo evento
              google.maps.event.clearListeners(mapRef.current, "dblclick");

              mapRef.current.addListener("dblclick", async (e: google.maps.MapMouseEvent) => {
                if (e.latLng) {
                  const newPosition = {
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                  };
                  lastPositionRef.current = newPosition;
                  markerRef.current?.setPosition(e.latLng);
                  try {
                    const response = await geocoder.geocode({ location: e.latLng });
                    if (response.results[0]) {
                      const newAddress = response.results[0].formatted_address;
                      onAddressChange(newAddress);
                      if (inputRef.current) {
                        inputRef.current.value = newAddress;
                      }
                    }
                  } catch {
                    console.error("Error al geocodificar.");
                  }
                  onLocationChange(newPosition);
                }
              });
            }

            setIsMapLoaded(true);
          }
        } catch (error) {
          console.error("Error al inicializar el mapa:", error);
          setMapError("No se pudo cargar el mapa.");
        }
      }
    };

    // Verificar si la API de Google Maps se ha cargado antes de inicializar el mapa
    if (window.google?.maps) {
      initMap();
    } else {
      const checkInterval = setInterval(() => {
        if (window.google?.maps) {
          clearInterval(checkInterval);
          initMap();
        }
      }, 500); // Reintentar cada 500ms hasta que se cargue

      return () => clearInterval(checkInterval);
    }
  }, [userLocation, onAddressChange, onLocationChange]);

  // Asegurar que el valor del input se mantenga sincronizado con el estado address
  useEffect(() => {
    if (inputRef.current && address !== inputRef.current.value) {
      inputRef.current.value = address;
    }
  }, [address]);

  // Agregar estilos globales al montar el componente
  useEffect(() => {
    // Crear un elemento de estilo para la página
    const styleElement = document.createElement("style");
    styleElement.innerHTML = `
      .pac-container {
        z-index: 10000 !important;
        pointer-events: auto !important;
      }
      .pac-item {
        cursor: pointer !important;
        pointer-events: auto !important;
      }
      .pac-item:hover {
        background-color: #f0f0f0 !important;
      }
    `;
    document.head.appendChild(styleElement);

    // Mover el contenedor de autocompletado fuera del modal para evitar conflictos
    const movePacContainer = () => {
      const pacContainers = document.querySelectorAll(".pac-container");
      pacContainers.forEach((container) => {
        if (container.parentElement !== document.body) {
          document.body.appendChild(container);
        }
      });
    };

    // Observar cambios en el DOM para detectar cuando aparece el pac-container
    const observer = new MutationObserver(() => {
      movePacContainer();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // También agregar event listeners para prevenir propagación de eventos al modal
    // IMPORTANTE: Solo stopPropagation, NO preventDefault, para que el clic funcione
    const preventModalClose = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".pac-container") || target.closest(".pac-item")) {
        e.stopPropagation();
        // NO usar preventDefault() aquí porque bloquea la selección de Google Places
      }
    };

    // Solo en mousedown para prevenir que el modal detecte el clic como "outside"
    document.addEventListener("mousedown", preventModalClose, true);

    // Limpiar al desmontar
    return () => {
      document.head.removeChild(styleElement);
      observer.disconnect();
      document.removeEventListener("mousedown", preventModalClose, true);
    };
  }, []);

  return (
    <>
      <div>
        <span className="flex gap-1 text-sm">
          <MapPin className="mr-1 h-4 w-4" /> Selecciona la ubicación de la sucursal
        </span>
      </div>

      <div className="space-y-4" data-location-picker>
        {/* Buscador completamente separado del mapa */}
        <div
          className="relative mb-4"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <Input
            id="address-input"
            type="text"
            placeholder="Escribe o busca la dirección aquí"
            className={`w-full ${isSearching ? "border-blue-500 ring-2 ring-blue-200" : ""}`}
            defaultValue={address}
            onChange={(e) => onAddressChange(e.target.value)}
            onKeyDown={(e) => {
              // Prevenir que Enter cierre el modal
              if (e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
          />
        </div>

        {/* Mapa en un contenedor separado y con indicador de búsqueda */}
        <div className="relative" ref={mapContainerRef}>
          <div className={`h-[25vh] w-full ${isSearching ? "opacity-70" : ""}`} id="map" />
          {isSearching && (
            <div className="absolute top-0 right-0 left-0 rounded-t bg-blue-100 p-1 text-center text-xs text-blue-800">
              Selecciona una ubicación del buscador
            </div>
          )}
        </div>
      </div>
    </>
  );
});
