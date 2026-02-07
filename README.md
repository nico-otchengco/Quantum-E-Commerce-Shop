# QUANTUM E - Commerce Shop

An e-commerce frontend focused on a seamless gadget-buying experience. Built for speed using Vite, React, and TypeScript.

# Features

- **Product Catalog:** Dynamic product listing with category filtering.
- **Cart:** Add/Remove items with price calculations(tax).
- **Responsive UI:** Modern UI using TailwindCSS
- **Type Safety:** 100% Typescript for props and data fetching
- **Seller / Admin Preview:** Dedicated UI for managing stock and viewing sales stats.

# The Stack

- **Core:** [React 18](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- **Build Tool:** [Vite](https://vite.dev/) (Near-instant HMR)
- **State Management:** [Zustand](https://github.com) (Small, fast, and scalable)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Data:** Currently using local JSON / Mock data for demonstration.

# Project Structure
```
src/
├── app/          # Core Setup
├── components/   # All UIs and pages
│   ├── admin/    # Seller / Admin UI
│   ├── auth/     # Log in Modal
│   ├── customer/ # Customer UI 
│   └── ui/       # Buttons, Inputs, Modals, Loaders, Alerts
├── context/      # Store Context
├── styles/       # Global CSS/Tailwind files and font
├── types/        # Global TypeScript interfaces (Product, User, Order, Cart Item, Dashboard Stats)
└── utils/        # Helper functions
```

# Future Improvements & Roadmap

future goal is to transition this project from static demo to a full-stack:
  - Replace local mock data with Supabase(PostgreSQL) for real-time inventory.
  - Implement user accounts to save products added to cart across sessions.
  - Implement seller accounts to limit viewing of their products only in stock management and order management.

# Disclaimer

This QUANTUM E - Commerce Shop project is for **demo purposes only**. No actual transactions were made, and data is automatically reset on page refresh.
