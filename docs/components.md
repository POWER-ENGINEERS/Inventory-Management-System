# Week 6 — Reusable Components

## Purpose
This document maps the reusable UI pieces used across the Inventory Management System. The goal is to keep repeated interface patterns consistent while giving every Week 6 screen a clear component and state mapping.

## Reusable components
| Component | Purpose | Used by |
| --- | --- | --- |
| Sidebar navigation | Moves between system views and applies permission-aware navigation | All authenticated screens |
| App header | Displays current view title, theme controls, notifications, and quick scanner | All authenticated screens |
| Data table | Consistent tabular layout for CRUD/read screens | Products, Suppliers, Purchase Orders, Receiving, Inventory, Customers, Employees, Audit Trail |
| List/table row | Repeated record presentation with action controls | Products, Suppliers, Purchase Orders, Receiving, Inventory, Customers, Employees |
| Form group | Consistent labels, inputs, selects, and validation-ready structure | Create/edit modals and Settings |
| Modal dialog | Reusable create/edit/detail/confirmation container | Products, Suppliers, Purchase Orders, Receiving, POS, Customers, Employees, Settings |
| Status badge | Communicates record state consistently | Products, Suppliers, Purchase Orders, Inventory, Employees, Audit Trail |
| Search/filter controls | Filters records without changing the screen structure | Products, Suppliers, Purchase Orders, Inventory, POS, Customers, Employees, Audit Trail |
| Empty state | Reusable no-data message with contextual title and message | Dashboard, Products, Categories/Brands, Suppliers, Purchase Orders, Receiving, Inventory, POS, Customers, Employees, Audit Trail |
| Loading state | Temporary screen preparation feedback | Authenticated screens through onViewLoaded() |
| Error state | Recoverable render failure with Try Again action | Authenticated screens through onViewLoaded() |
| Toast notification | Short success/error/info feedback | CRUD actions, Settings, POS, backup/restore |

## Screen-to-component mapping
| Screen | Primary reusable pieces | Required states |
| --- | --- | --- |
| Dashboard | Stat cards, charts, data table, notification list | Loading, empty recent transactions, error |
| Products | Toolbar, search/filter controls, data table, status badges, CRUD modals | Loading, empty, error |
| Categories & Brands | Tables, CRUD modals, reusable empty state | Loading, empty, error |
| Suppliers | Toolbar, data table, status badges, CRUD modals | Loading, empty, error |
| Purchase Orders | Toolbar, data table, status badges, CRUD modals | Loading, empty, error |
| Receiving (Deliveries) | Toolbar, data table, status badges, receiving modal | Loading, empty, error |
| Inventory Movements | Toolbar, data table, filters, status badges | Loading, empty, error |
| Sales Terminal (POS) | Product grid, search/filter controls, cart, payment modal | Loading, empty catalog/cart, error |
| Customers | Toolbar, data table, search/filter controls, CRUD/detail modal | Loading, empty, error |
| Employees | Toolbar, data table, search/filter controls, CRUD/detail modal | Loading, empty, error |
| Reports & Financials | Report tabs, filters, chart/table output, export controls | Loading, empty report data, error |
| Audit Trail | Search/filter controls, data table, status badges | Loading, empty, error |
| Settings | Form groups, confirmation patterns, backup/restore controls | Loading, error |

## Week 6 implementation notes
- Empty states are generated from the reusable empty-state template through showEmptyState().
- Table empty states are wrapped in a valid table row/cell so reusable state markup remains valid inside tbody.
- Loading and error states use a temporary host so the existing screen DOM is not destroyed while a view is prepared.
- Existing localStorage data behavior and application logic are preserved; Week 6 focuses on reusable presentation components and UI states.
