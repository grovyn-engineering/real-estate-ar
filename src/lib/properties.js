import { assetUrl } from "@/config/assets";

export const properties = [
  {
    id: "property-101",
    title: "Luxury 3BHK Apartment",
    description:
      "Spacious modern apartment with panoramic city views, premium finishes, and smart home integration.",
    price: "₹2.4 Cr",
    location: "Bandra West, Mumbai",
    beds: 3,
    baths: 2,
    sqft: 1850,
    thumbnail: assetUrl("/360/panaromic.jpg"),
    vr: {
      model: assetUrl("/models/low-poly-house/scene.gltf"),
      rooms: [
        {
          id: "living-room",
          name: "Living Room",
          panorama: assetUrl("/360/glasshouse_interior_1k.exr"),
          model: assetUrl("/models/living_room/scene.gltf"),
          bounds: [0, 0, 8, 6],
          hotspots: [
            {
              id: "to-bedroom",
              label: "Bedroom →",
              position: [4, -0.5, -2],
              targetRoomId: "master-bedroom",
            },
            {
              id: "to-kitchen",
              label: "Kitchen →",
              position: [-4, -0.5, -2],
              targetRoomId: "kitchen",
            },
          ],
        },
        {
          id: "master-bedroom",
          name: "Master Bedroom",
          panorama: assetUrl("/360/brown_photostudio_07_2k.exr"),
          model: assetUrl("/models/modern_bedroom/scene.gltf"),
          bounds: [9, 0, 6, 5],
          hotspots: [
            {
              id: "bedroom-to-living",
              label: "← Living Room",
              position: [-4, -0.5, -2],
              targetRoomId: "living-room",
            },
            {
              id: "bedroom-to-kitchen",
              label: "Kitchen →",
              position: [4, -0.5, -2],
              targetRoomId: "kitchen",
            },
          ],
        },
        {
          id: "kitchen",
          name: "Kitchen",
          panorama: assetUrl("/360/blinds_2k.exr"),
          model: assetUrl("/models/kitchen/scene.gltf"),
          bounds: [0, 7, 5, 4],
          hotspots: [
            {
              id: "kitchen-to-living",
              label: "← Living Room",
              position: [4, -0.5, -2],
              targetRoomId: "living-room",
            },
            {
              id: "kitchen-to-bedroom",
              label: "← Bedroom",
              position: [-4, -0.5, -2],
              targetRoomId: "master-bedroom",
            },
          ],
        },
      ],
    },
  },
  {
    id: "property-202",
    title: "Modern 2BHK Studio Villa",
    description:
      "Contemporary villa with open plan living, private garden, and rooftop terrace. Perfect for urban families.",
    price: "₹1.1 Cr",
    location: "Whitefield, Bangalore",
    beds: 2,
    baths: 2,
    sqft: 1200,
    thumbnail: assetUrl("/360/panaromic.jpg"),
    vr: {
      model: assetUrl("/models/modern-apartment/scene.gltf"),
      modelEmbed: "https://sketchfab.com/models/6e41320708f74a6ba974ff8c26746ed8/embed",
      rooms: [
        {
          id: "hall",
          name: "Living Room",
          panorama: assetUrl("/360/glasshouse_interior_1k.exr"),
          model: assetUrl("/models/living/scene.gltf"),
          bounds: [0, 0, 7, 5],
          hotspots: [
            {
              id: "hall-to-bedroom",
              label: "Bedroom →",
              position: [4, -0.5, -2],
              targetRoomId: "bedroom",
            },
            {
              id: "hall-to-garden",
              label: "Kitchen →",
              position: [-4, -0.5, -2],
              targetRoomId: "garden",
            },
          ],
        },
        {
          id: "bedroom",
          name: "Master Bedroom",
          panorama: assetUrl("/360/brown_photostudio_07_2k.exr"),
          model: assetUrl("/models/bed/scene.gltf"),
          bounds: [8, 0, 5, 5],
          hotspots: [
            {
              id: "bedroom-to-hall",
              label: "← Living Room",
              position: [-4, -0.5, -2],
              targetRoomId: "hall",
            },
            {
              id: "bedroom-to-garden",
              label: "Kitchen →",
              position: [4, -0.5, -2],
              targetRoomId: "garden",
            },
          ],
        },
        {
          id: "garden",
          name: "Kitchen",
          panorama: assetUrl("/360/blinds_2k.exr"),
          model: assetUrl("/models/kitchen_room/scene.gltf"),
          bounds: [0, 6, 7, 4],
          hotspots: [
            {
              id: "garden-to-hall",
              label: "← Living Room",
              position: [4, -0.5, -2],
              targetRoomId: "hall",
            },
            {
              id: "garden-to-bedroom",
              label: "← Bedroom",
              position: [-4, -0.5, -2],
              targetRoomId: "bedroom",
            },
          ],
        },
      ],
    },
  },
];

export function getProperty(id) {
  return properties.find((p) => p.id === id);
}
