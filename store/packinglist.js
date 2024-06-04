import { defineStore } from 'pinia'

export const usePackingStore = defineStore('packing', {
  state: () => ({
    list: [
      {
        "id": "documents",
        "title": "Documents",
        "entries": [
          { "w": "Festival Ticket", "c": false },
          { "w": "Bus Ticket", "c": false },
          { "w": "ID or Passport", "c": false },
          { "w": "Cash / Bank Card", "c": false },
          { "w": "Health Insurance Card", "c": false },
          { "w": "Medical Certificate", "c": false }
        ]
      },
      {
        "id": "around_tent",
        "title": "Around the Tent",
        "entries": [
          { "w": "Tent (complete?)", "c": false },
          { "w": "Extra tent pegs", "c": false },
          { "w": "Rubber mallet", "c": false },
          { "w": "Air mattress / Sleeping pad", "c": false },
          { "w": "Fitted sheet", "c": false },
          { "w": "Sleeping bag / Blanket", "c": false },
          { "w": "Pillow", "c": false },
          { "w": "Pump", "c": false },
          { "w": "Padlock for tent", "c": false }
        ]
      },
      {
        "id": "camping",
        "title": "Camping",
        "entries": [
          { "w": "Folding chairs", "c": false },
          { "w": "Folding table", "c": false },
          { "w": "Camping lamp", "c": false },
          { "w": "Cooler", "c": false },
          { "w": "Camping cutlery", "c": false },
          { "w": "Camping dishes", "c": false },
          { "w": "Camping grill (if allowed)", "c": false },
          { "w": "Charcoal / Igniter (if allowed)", "c": false },
          { "w": "Can / Bottle opener", "c": false },
          { "w": "Tape", "c": false },
          { "w": "Garbage bags", "c": false },
          { "w": "Cable ties", "c": false },
          { "w": "Carabiner", "c": false },
          { "w": "Paper towels / Napkins / Aluminum foil", "c": false },
          { "w": "Aluminum foil / Fresh bags", "c": false },
          { "w": "Sponge / Cloth / Dish towel", "c": false },
          { "w": "Collapsible water container", "c": false },
          { "w": "Lighter", "c": false }
        ]
      },
      {
        "id": "food_drinks",
        "title": "Food & Drinks",
        "entries": [
          { "w": "Alcoholic beverages", "c": false },
          { "w": "Canned food (e.g. Ravioli)", "c": false },
          { "w": "meat & sausages for BBQ", "c": false },
          { "w": "Coffee", "c": false },
          { "w": "Sauces", "c": false },
          { "w": "Snacks", "c": false },
          { "w": "Soft drinks", "c": false },
          { "w": "Water", "c": false }
        ]
      },
      {
        "id": "clothing",
        "title": "Clothing",
        "entries": [
          { "w": "Festival outfit", "c": false },
          { "w": "(Shirts, Shorts, Skirts etc.) ^", "c": false },
          { "w": "(Sweaters, Hoodie, Jacket etc.) ^", "c": false },
          { "w": "Rain jacket", "c": false },
          { "w": "Swim trunks / Bikini", "c": false },
          { "w": "Sweatpants", "c": false },
          { "w": "Cap / Hat", "c": false },
          { "w": "Sunglasses (+ Case)", "c": false },
          { "w": "Glasses / Contact lenses", "c": false },
          { "w": "Sleep pants / Sleep shirt", "c": false },
          { "w": "Sleep mask", "c": false },
          { "w": "Underwear", "c": false },
          { "w": "Socks", "c": false },
          { "w": "Extra pair of shoes", "c": false },
          { "w": "Flip flops / Bath slippers", "c": false },
          { "w": "Hangers (useful for showering)", "c": false }
        ]
      },
      {
        "id": "hygiene",
        "title": "Hygiene",
        "entries": [
          { "w": "Towels (small & large)", "c": false },
          { "w": "Toiletry bag", "c": false },
          { "w": "Small mirror", "c": false },
          { "w": "Toothbrush", "c": false },
          { "w": "Toothpaste", "c": false },
          { "w": "Shampoo", "c": false },
          { "w": "Shower gel", "c": false },
          { "w": "Deodorant", "c": false },
          { "w": "Disinfectant", "c": false },
          { "w": "Hairbrush", "c": false },
          { "w": "Hair gel", "c": false },
          { "w": "Hairspray", "c": false },
          { "w": "Make-up (and remover)", "c": false },
          { "w": "Sunscreen", "c": false },
          { "w": "Toilet paper", "c": false },
          { "w": "Razor", "c": false },
          { "w": "Lip care", "c": false },
          { "w": "Wet wipes", "c": false },
          { "w": "Tissues", "c": false },
          { "w": "Condoms", "c": false }
        ]
      },
      {
        "id": "festival_pharmacy",
        "title": "Festival Pharmacy",
        "entries": [
          { "w": "Blister plasters", "c": false },
          { "w": "First aid kit", "c": false },
          { "w": "Insect repellent", "c": false },
          { "w": "Insect bite healer", "c": false },
          { "w": "Personal medication", "c": false },
          { "w": "Plasters", "c": false },
          { "w": "Painkillers (Headaches)", "c": false },
          { "w": "Tick card or tweezers", "c": false }
        ]
      },
      {
        "id": "other",
        "title": "Other Items",
        "entries": [
          { "w": "Mobile phone", "c": false },
          { "w": "Charger", "c": false },
          { "w": "Power Bank", "c": false },
          { "w": "Small speakers", "c": false },
          { "w": "Flashlight", "c": false },
          { "w": "Batteries", "c": false },
          { "w": "Earplugs", "c": false },
          { "w": "Waist bag / Neck pouch", "c": false },
          { "w": "Cart", "c": false }
        ]
      }
    ],
  }),
  actions: {
    updateList(newList) {
      this.list = newList
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
})
