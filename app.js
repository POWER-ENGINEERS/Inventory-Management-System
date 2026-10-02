/* ==========================================================================
   Da Bugss Premium Inventory & POS App Logic
   ========================================================================== */

(function () {
    // Current System Time & Defaults
    const DEFAULT_COMPANY = {
        name: "Da Bugss Ltd.",
        email: "contact@dabugss.com",
        phone: "+1 (555) 123-4567",
        address: "123 Innovation Drive, Tech District, Silicon Valley, CA",
        currency: "₱",
        taxRate: 12,
        receiptFooter: "Thank you for shopping with us! Please come again."
    };

    // Predefined Demo Accounts
    const DEMO_ACCOUNTS = {
        superadmin: { name: "Super Admin", role: "Super Admin", initials: "SA" },
        admin: { name: "Administrator", role: "Administrator", initials: "AD" },
        cashier: { name: "Cashier", role: "Cashier", initials: "CS" },
        warehouse: { name: "Warehouse Staff", role: "Warehouse Staff", initials: "WS" }
    };

    // Predefined Database Seed Data
    const SEED_DATA = {
        categories: [
            { id: "cat-1", name: "Grocery", desc: "Food items, dairy, snacks and household consumables" },
            { id: "cat-2", name: "Electronics", desc: "Computer hardware, phones, accessories and gadgets" },
            { id: "cat-3", name: "Hardware", desc: "Tools, fasteners, building materials and paint" },
            { id: "cat-4", name: "Medicine", desc: "Over-the-counter drugs, prescriptions and health supplies" },
            { id: "cat-5", name: "Office Supplies", desc: "Paper, writing instruments, binders and files" }
        ],
        brands: [
            { id: "bnd-1", name: "Logitech" },
            { id: "bnd-2", name: "Apple" },
            { id: "bnd-3", name: "Samsung" },
            { id: "bnd-4", name: "Bosch" },
            { id: "bnd-5", name: "Pfizer" },
            { id: "bnd-6", name: "PaperMate" },
            { id: "bnd-7", name: "Generic" }
        ],
        suppliers: [
            { id: "sup-1", company: "Tech Depot Inc.", contact: "Mark Smith", phone: "555-0101", email: "wholesale@techdepot.com", address: "404 Silicon Way, San Jose, CA" },
            { id: "sup-2", company: "AgriFoods Wholesale", contact: "Sarah Connor", phone: "555-0102", email: "sales@agrifoods.com", address: "101 Green Valley Rd, Sacramento, CA" },
            { id: "sup-3", company: "Pharmaceutics Dist.", contact: "Dr. Bruce Wayne", phone: "555-0103", email: "order@pharmadist.com", address: "1007 Mountain Drive, Gotham City, NJ" }
        ],
        products: [
            {
                id: "prod-1", name: "Logitech MX Master 3", barcode: "480111111111", SKU: "LOGI-MX3",
                category: "cat-2", brand: "bnd-1", supplier: "sup-1", description: "Premium wireless productivity mouse",
                purchasePrice: 60.00, sellingPrice: 99.99, qty: 15, unit: "pcs", expiration: "", status: "Active"
            },
            {
                id: "prod-2", name: "Organic Fresh Milk 1L", barcode: "480222222222", SKU: "GROC-MILK-1",
                category: "cat-1", brand: "bnd-7", supplier: "sup-2", description: "1 Liter pasteurized fresh organic whole milk",
                purchasePrice: 1.50, sellingPrice: 2.99, qty: 4, unit: "box", expiration: getFutureDate(10), status: "Active" // Near expiration (10 days)
            },
            {
                id: "prod-3", name: "Paracetamol 500mg Tab", barcode: "480333333333", SKU: "MED-PARA-5",
                category: "cat-4", brand: "bnd-5", supplier: "sup-3", description: "Pain relief and fever reducing tablets",
                purchasePrice: 4.50, sellingPrice: 10.00, qty: 50, unit: "pack", expiration: getFutureDate(-20), status: "Active" // Expired 20 days ago
            },
            {
                id: "prod-4", name: "A4 Copy Paper 500 Sheets", barcode: "480444444444", SKU: "OFF-PAPER-A4",
                category: "cat-5", brand: "bnd-6", supplier: "sup-1", description: "High-grade 80gsm A4 printer paper",
                purchasePrice: 2.00, sellingPrice: 4.50, qty: 0, unit: "pack", expiration: "", status: "Active" // Out of stock
            },
            {
                id: "prod-5", name: "Bosch Cordless Drill 18V", barcode: "480555555555", SKU: "HARD-DRILL-18",
                category: "cat-3", brand: "bnd-4", supplier: "sup-1", description: "Cordless drill driver with lithium-ion battery",
                purchasePrice: 45.00, sellingPrice: 89.99, qty: 2, unit: "pcs", expiration: "", status: "Active" // Low stock
            }
        ],
        customers: [
            { id: "cust-1", name: "Jane Doe", phone: "555-0199", email: "jane@example.com", address: "742 Evergreen Terrace, Springfield", points: 120 },
            { id: "cust-2", name: "John Smith", phone: "555-0144", email: "john@example.com", address: "555 Elm Street, Metropolis", points: 45 }
        ],
        employees: [
            { id: "emp-1", name: "Robert Johnson", position: "Administrator", username: "admin", email: "robert@company.com", phone: "555-9012", status: "Active" },
            { id: "emp-2", name: "Emily Watson", position: "Cashier", username: "cashier", email: "emily@company.com", phone: "555-8833", status: "Active" },
            { id: "emp-3", name: "David Miller", position: "Warehouse Staff", username: "warehouse", email: "david@company.com", phone: "555-4512", status: "Active" }
        ],
        purchaseOrders: [
            {
                id: "po-10001", poNumber: "PO-10001", supplierId: "sup-1", orderDate: getFutureDate(-5),
                expectedDate: getFutureDate(3), items: [
                    { productId: "prod-1", name: "Logitech MX Master 3", cost: 60.00, qty: 20 },
                    { productId: "prod-4", name: "A4 Copy Paper 500 Sheets", cost: 2.00, qty: 50 }
                ],
                totalCost: 1300.00, status: "Ordered"
            },
            {
                id: "po-10002", poNumber: "PO-10002", supplierId: "sup-2", orderDate: getFutureDate(-2),
                expectedDate: getFutureDate(5), items: [
                    { productId: "prod-2", name: "Organic Fresh Milk 1L", cost: 1.50, qty: 100 }
                ],
                totalCost: 150.00, status: "Approved"
            }
        ],
        sales: [
            {
                id: "sale-20001", receiptNo: "TXN-20001", date: getFutureDate(-1) + " 14:32",
                cashier: "Emily Watson", customerId: "cust-1", paymentMethod: "Cash",
                items: [{ productId: "prod-1", name: "Logitech MX Master 3", price: 99.99, qty: 1, subtotal: 99.99 }],
                subtotal: 99.99, discount: 5, tax: 11.40, total: 106.39, amountTendered: 110.00, changeDue: 3.61
            },
            {
                id: "sale-20002", receiptNo: "TXN-20002", date: getFutureDate(0) + " 09:15",
                cashier: "Emily Watson", customerId: "walkin", paymentMethod: "GCash",
                items: [{ productId: "prod-3", name: "Paracetamol 500mg Tab", price: 10.00, qty: 3, subtotal: 30.00 }],
                subtotal: 30.00, discount: 0, tax: 3.60, total: 33.60, amountTendered: 33.60, changeDue: 0.00
            }
        ],
        inventoryHistory: [
            { id: "h-1", timestamp: getFutureDate(-5) + " 08:00", productId: "prod-1", type: "Stock In", qty: 15, source: "Supplier Depot", destination: "Main Warehouse", reason: "Initial setup", user: "Super Admin" },
            { id: "h-2", timestamp: getFutureDate(-4) + " 09:10", productId: "prod-2", type: "Stock In", qty: 4, source: "AgriFoods Wholesale", destination: "Retail Store Shelf", reason: "Initial setup", user: "Super Admin" },
            { id: "h-3", timestamp: getFutureDate(-3) + " 10:15", productId: "prod-3", type: "Stock In", qty: 50, source: "Pharmaceutics Dist.", destination: "Retail Store Shelf", reason: "Initial setup", user: "Super Admin" },
            { id: "h-4", timestamp: getFutureDate(-2) + " 11:30", productId: "prod-5", type: "Stock In", qty: 2, source: "Supplier Depot", destination: "Main Warehouse", reason: "Initial setup", user: "Super Admin" },
            { id: "h-5", timestamp: getFutureDate(-1) + " 14:32", productId: "prod-1", type: "Stock Out", qty: 1, source: "Retail Store Shelf", destination: "Customer Sale", reason: "Sale TXN-20001", user: "Emily Watson" },
            { id: "h-6", timestamp: getFutureDate(0) + " 09:15", productId: "prod-3", type: "Stock Out", qty: 3, source: "Retail Store Shelf", destination: "Customer Sale", reason: "Sale TXN-20002", user: "Emily Watson" }
        ],
        auditTrail: [
            { id: "a-1", timestamp: getFutureDate(-5) + " 07:50", user: "superadmin", role: "Super Admin", category: "Settings", desc: "System initialized with seed database", ip: "127.0.0.1" },
            { id: "a-2", timestamp: getFutureDate(-1) + " 14:30", user: "cashier", role: "Cashier", category: "Login", desc: "User cashier logged in successfully", ip: "192.168.1.52" },
            { id: "a-3", timestamp: getFutureDate(-1) + " 14:32", user: "cashier", role: "Cashier", category: "Sales", desc: "Completed sale checkout TXN-20001 for Jane Doe ($106.39)", ip: "192.168.1.52" }
        ]
    };

    // Global App State
    let db = {};
    let currentUser = null;
    let shoppingCart = [];
    let activeReceivingPO = null;
    let selectedPOItems = [];
    let charts = {};

    // Helper Date functions
    function getFutureDate(offsetDays) {
        const d = new Date();
        d.setDate(d.getDate() + offsetDays);
        return d.toISOString().split('T')[0];
    }

    function formatDateTime(dateObj) {
        const d = dateObj || new Date();
        const dateStr = d.toISOString().split('T')[0];
        const timeStr = d.toTimeString().split(' ')[0].substring(0, 5);
        return `${dateStr} ${timeStr}`;
    }

    // Initialize Database
    function initDatabase() {
        const stored = (localStorage.getItem("dabugss_db") || localStorage.getItem("apexstock_db"));
        if (stored) {
            try {
                db = JSON.parse(stored);
                // Backwards compatibility / data integrity checks
                if (!db.settings) db.settings = { ...DEFAULT_COMPANY };
                else if (db.settings.currency === "$") db.settings.currency = "₱"; // migration to PHP peso
                if (!db.products) db.products = [...SEED_DATA.products];
                if (!db.categories) db.categories = [...SEED_DATA.categories];
                if (!db.brands) db.brands = [...SEED_DATA.brands];
                if (!db.suppliers) db.suppliers = [...SEED_DATA.suppliers];
                if (!db.customers) db.customers = [...SEED_DATA.customers];
                if (!db.employees) db.employees = [...SEED_DATA.employees];
                if (!db.purchaseOrders) db.purchaseOrders = [...SEED_DATA.purchaseOrders];
                if (!db.sales) db.sales = [...SEED_DATA.sales];
                if (!db.inventoryHistory) db.inventoryHistory = [...SEED_DATA.inventoryHistory];
                if (!db.auditTrail) db.auditTrail = [...SEED_DATA.auditTrail];
            } catch (e) {
                db = { ...SEED_DATA, settings: { ...DEFAULT_COMPANY } };
                saveDatabase();
            }
        } else {
            db = { ...SEED_DATA, settings: { ...DEFAULT_COMPANY } };
            saveDatabase();
        }
    }

    function saveDatabase() {
        // Laravel is the source of truth for products, suppliers, and categories.
        // localStorage remains only as a fallback/cache for modules not yet migrated.
        localStorage.setItem("dabugss_db", JSON.stringify(db));
    }

    // --------------------------------------------------------------------------
    // Week 7: Laravel API data layer
    // --------------------------------------------------------------------------
    const API_BASE_URL = window.INVENTORY_API_BASE_URL ||
        (window.location.port === "8000" ? "/api" : "http://127.0.0.1:8000/api");

    async function apiRequest(path, options = {}) {
        const token = localStorage.getItem("inventory_auth_token");
        const response = await fetch(API_BASE_URL + path, {
            ...options,
            headers: {
                "Accept": "application/json",
                ...(token ? { "Authorization": `Bearer ${token}` } : {}),
                ...(options.body ? { "Content-Type": "application/json" } : {}),
                ...(options.headers || {})
            }
        });
        let payload = null;
        try { payload = await response.json(); } catch (_) {}
        if (!response.ok) {
            const error = new Error(payload?.message || payload?.error || "The Laravel API request failed.");
            error.status = response.status;
            error.errors = payload?.errors || {};
            throw error;
        }
        return payload;
    }

    function mapBackendProduct(product) {
        return {
            id: String(product.product_id ?? product.id),
            name: product.product_name ?? product.name ?? "",
            barcode: product.barcode ?? "",
            SKU: product.sku ?? product.SKU ?? "",
            category: String(product.category_id ?? product.categoryKey ?? product.category?.category_id ?? ""),
            brand: product.brand ?? "",
            supplier: String(product.supplier_id ?? product.supplierKey ?? product.supplier?.supplier_id ?? ""),
            description: product.description ?? "",
            purchasePrice: Number(product.purchase_price ?? product.purchasePrice ?? 0),
            sellingPrice: Number(product.selling_price ?? product.price ?? product.sellingPrice ?? 0),
            qty: Number(product.quantity ?? product.qty ?? 0),
            unit: product.unit ?? "pcs",
            expiration: product.expiration ?? "",
            status: product.status ?? "Active",
            image: product.image ?? ""
        };
    }

    function mapBackendSupplier(supplier) {
        return {
            id: String(supplier.supplier_id ?? supplier.id),
            company: supplier.supplier_name ?? supplier.company ?? "",
            contact: supplier.contact_person ?? supplier.contact ?? "",
            phone: supplier.phone ?? supplier.contact_number ?? "",
            email: supplier.email ?? "",
            address: supplier.address ?? ""
        };
    }

    function mapBackendCategory(category) {
        return {
            id: String(category.category_id ?? category.id),
            name: category.category_name ?? category.name ?? "",
            desc: category.description ?? category.desc ?? ""
        };
    }

    async function syncBackendCatalog() {
        try {
            const [productsResponse, suppliersResponse, categoriesResponse] = await Promise.all([
                apiRequest("/products"),
                apiRequest("/suppliers"),
                apiRequest("/categories")
            ]);
            db.products = (productsResponse?.data || []).map(mapBackendProduct);
            db.suppliers = (suppliersResponse?.data || []).map(mapBackendSupplier);
            db.categories = (categoriesResponse?.data || []).map(mapBackendCategory);
            populateDropdowns();
            if (activeView === "products") renderProductsTable();
            if (activeView === "suppliers") renderSuppliersTable();
        } catch (error) {
            console.error("Laravel catalog sync failed:", error);
            showToast("Laravel API unavailable", "The frontend is using its local fallback data. Start Laravel and try again.", "warning");
        }
    }

    async function loadUserAccounts() {
        const tbody = document.getElementById("user-accounts-table-body");
        if (!tbody || !currentUser || currentUser.role !== "Super Admin") return;

        try {
            const response = await apiRequest("/auth/users");
            tbody.innerHTML = "";

            (response.users || []).forEach(user => {
                const tr = document.createElement("tr");
                [user.name, user.username, user.email, user.role, user.status].forEach((value, index) => {
                    const td = document.createElement("td");
                    if (index === 3) {
                        const badge = document.createElement("span");
                        badge.className = "badge badge-info";
                        badge.textContent = value;
                        td.appendChild(badge);
                    } else {
                        td.textContent = value ?? "";
                    }
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });

            if (!response.users?.length) {
                showEmptyState(tbody, "No user accounts found", "Create an account to give a staff member access to the system.");
            }
        } catch (error) {
            console.error("Unable to load user accounts:", error);
            showErrorState(tbody, "Unable to load accounts", error.message || "The Laravel account service is unavailable.", loadUserAccounts);
        }
    }

    document.getElementById("create-user-account-btn")?.addEventListener("click", function () {
        if (!checkPermission("configure_settings")) return;
        const form = document.getElementById("user-account-form");
        form.reset();
        clearFormErrors(form);
        openModal("user-account-modal");
    });

    document.getElementById("user-account-form")?.addEventListener("submit", async function (e) {
        e.preventDefault();
        const form = this;
        clearFormErrors(form);

        const payload = {
            name: document.getElementById("account-name").value.trim(),
            username: document.getElementById("account-username").value.trim().toLowerCase(),
            email: document.getElementById("account-email").value.trim().toLowerCase(),
            password: document.getElementById("account-password").value,
            password_confirmation: document.getElementById("account-password-confirmation").value,
            role: document.getElementById("account-role").value
        };

        setFormBusy(form, true);
        try {
            await apiRequest("/auth/users", { method: "POST", body: JSON.stringify(payload) });
            closeModal("user-account-modal");
            showToast("Account Created", `${payload.name} can now sign in using the Laravel account.`, "success");
            await loadUserAccounts();
        } catch (error) {
            if (error.errors) showFormErrors(form, error.errors);
            showToast("Account Creation Failed", error.message || "Unable to create the account.", "danger");
        } finally {
            setFormBusy(form, false);
        }
    });

    function setFormBusy(form, busy) {
        const button = form?.querySelector('button[type="submit"]');
        if (!button) return;
        if (busy) {
            if (!button.dataset.originalHtml) button.dataset.originalHtml = button.innerHTML;
            button.disabled = true;
            button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
        } else {
            button.disabled = false;
            button.innerHTML = button.dataset.originalHtml || "Save";
            delete button.dataset.originalHtml;
        }
    }

    function clearFormErrors(form) {
        if (!form) return;
        form.querySelectorAll(".week7-field-error").forEach(el => el.remove());
        form.querySelectorAll(".week7-field-invalid").forEach(el => el.classList.remove("week7-field-invalid"));
    }

    function showFormErrors(form, errors) {
        clearFormErrors(form);
        const fieldMap = {
            product_name: "prod-name", sku: "prod-sku", barcode: "prod-barcode",
            category_id: "prod-category", brand: "prod-brand", supplier_id: "prod-supplier",
            quantity: "prod-qty", unit: "prod-unit", price: "prod-selling-price",
            purchase_price: "prod-purchase-price", selling_price: "prod-selling-price",
            expiration: "prod-expiration", description: "prod-desc", image: "prod-image",
            supplier_name: "supp-company", contact_person: "supp-contact",
            contact_number: "supp-phone", phone: "supp-phone", email: "supp-email",
            address: "supp-address"
        };
        Object.entries(errors || {}).forEach(([field, messages]) => {
            const input = document.getElementById(fieldMap[field] || field);
            if (!input) return;
            input.classList.add("week7-field-invalid");
            const error = document.createElement("div");
            error.className = "week7-field-error";
            error.textContent = Array.isArray(messages) ? messages[0] : String(messages);
            input.insertAdjacentElement("afterend", error);
        });
    }

    async function saveProductToLaravel(payload, id = "") {
        return apiRequest(id ? `/products/${encodeURIComponent(id)}` : "/products", {
            method: id ? "PUT" : "POST",
            body: JSON.stringify(payload)
        });
    }

    async function saveSupplierToLaravel(payload, id = "") {
        return apiRequest(id ? `/suppliers/${encodeURIComponent(id)}` : "/suppliers", {
            method: id ? "PUT" : "POST",
            body: JSON.stringify(payload)
        });
    }

    // Role-based Access Rules
    const PERMISSIONS = {
        "Super Admin": ["manage_products", "manage_suppliers", "manage_inventory", "manage_employees", "generate_reports", "receive_deliveries", "process_sales", "view_audit_trail", "configure_settings"],
        "Administrator": ["manage_products", "manage_suppliers", "manage_inventory", "manage_employees", "generate_reports", "receive_deliveries"],
        "Cashier": ["process_sales"],
        "Warehouse Staff": ["manage_inventory", "receive_deliveries"]
    };

    function checkPermission(perm) {
        if (!currentUser) return false;
        const perms = PERMISSIONS[currentUser.role] || [];
        return perms.includes(perm);
    }

    function applyRolePermissions() {
        const role = currentUser.role;
        document.getElementById("user-display-name").textContent = currentUser.name;
        document.getElementById("user-role-label").textContent = role;
        document.getElementById("user-initials").textContent = currentUser.initials;

        // Hide/Show sidebar links based on role permissions
        document.querySelectorAll(".sidebar-nav li[data-perm]").forEach(li => {
            const requiredPerm = li.getAttribute("data-perm");
            if (checkPermission(requiredPerm)) {
                li.classList.remove("hidden");
            } else {
                li.classList.add("hidden");
            }
        });

        // Hide/Show bottom bar chips based on permissions
        document.querySelectorAll("#bottom-bar-track .bottom-tab-chip[data-perm]").forEach(chip => {
            const requiredPerm = chip.getAttribute("data-perm");
            if (checkPermission(requiredPerm)) {
                chip.classList.remove("hidden");
            } else {
                chip.classList.add("hidden");
            }
        });

        // Hide UI buttons/features that require specific configurations
        const hasAdjustPerm = checkPermission("manage_inventory");
        document.getElementById("inventory-adjust-btn").classList.toggle("hidden", !hasAdjustPerm);
        document.getElementById("inventory-transfer-btn").classList.toggle("hidden", !hasAdjustPerm);
        
        const hasAddProdPerm = checkPermission("manage_products");
        document.getElementById("add-product-btn").classList.toggle("hidden", !hasAddProdPerm);

        const hasClearAuditPerm = checkPermission("configure_settings");
        document.getElementById("clear-audit-logs-btn").classList.toggle("hidden", !hasClearAuditPerm);
    }

    // Log Activity to Audit Trail
    function logAudit(category, desc) {
        const log = {
            id: "a-" + Date.now() + Math.random().toString(36).substr(2, 4),
            timestamp: formatDateTime(),
            user: currentUser ? currentUser.username : "guest",
            role: currentUser ? currentUser.role : "None",
            category: category,
            desc: desc,
            ip: "192.168.1." + Math.floor(Math.random() * 254 + 2)
        };
        db.auditTrail.unshift(log);
        saveDatabase();
        if (activeView === "audit-trail") {
            renderAuditTrail();
        }
    }

    // =========================================
// WEEK 6: REUSABLE UI STATE HELPERS
// =========================================

function createUIState(templateId, title, message) {
    const template = document.getElementById(templateId);

    if (!template) {
        console.error(`UI state template not found: ${templateId}`);
        return null;
    }

    const state = template.content.cloneNode(true);

    const titleElement = state.querySelector(".ui-state-title");
    const messageElement = state.querySelector(".ui-state-message");

    if (titleElement && title) {
        titleElement.textContent = title;
    }

    if (messageElement && message) {
        messageElement.textContent = message;
    }

    return state;
}

function showEmptyState(
    container,
    title = "No records found",
    message = "There are no records to display."
) {
    if (!container) return;

    container.innerHTML = "";

    const state = createUIState(
        "empty-state-template",
        title,
        message
    );

    if (!state) return;

    if (container.tagName === "TBODY") {
        const row = document.createElement("tr");
        const cell = document.createElement("td");

        const columnCount =
            container.closest("table")?.querySelectorAll("thead th").length || 1;

        cell.colSpan = columnCount;
        cell.className = "text-center ui-state-table-cell";
        cell.appendChild(state);

        row.appendChild(cell);
        container.appendChild(row);

        return;
    }

    container.appendChild(state);
}

function showLoadingState(
    container,
    title = "Loading...",
    message = "Please wait while the data is being loaded."
) {
    if (!container) return;

    container.innerHTML = "";

    const state = createUIState(
        "loading-state-template",
        title,
        message
    );

    if (state) {
        container.appendChild(state);
    }
}

function showErrorState(
    container,
    title = "Something went wrong",
    message = "We could not load the requested information.",
    retryCallback = null
) {
    if (!container) return;

    container.innerHTML = "";

    const state = createUIState(
        "error-state-template",
        title,
        message
    );

    if (!state) return;

    const retryButton = state.querySelector(".ui-state-retry");

    if (retryButton && typeof retryCallback === "function") {
        retryButton.addEventListener("click", retryCallback);
    }

    container.appendChild(state);
}

// =========================================
// Toast Manager
// =========================================

function showToast(title, message, type = "info") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    let icon = "fa-circle-info text-primary";
    if (type === "success") icon = "fa-circle-check text-success";
    if (type === "warning") icon = "fa-triangle-exclamation text-warning";
    if (type === "danger") icon = "fa-circle-xmark text-danger";

    toast.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-msg">${message}</div>
        </div>
        <button class="toast-close">&times;</button>
    `;

    // Click to close
    toast.querySelector(".toast-close").addEventListener("click", (e) => {
        e.stopPropagation();
        toast.remove();
    });

    toast.addEventListener("click", () => toast.remove());

    container.appendChild(toast);

    // Auto remove
    setTimeout(() => {
        toast.style.animation =
            "slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) reverse forwards";

        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

    // Active View switching
    let activeView = "dashboard";
    function switchView(viewId) {
        if (!currentUser) return;
        
        // Check permissions for restricted views
        const li = document.querySelector(`.sidebar-nav li[data-view="${viewId}"]`);
        if (li && li.hasAttribute("data-perm")) {
            const requiredPerm = li.getAttribute("data-perm");
            if (!checkPermission(requiredPerm)) {
                showToast("Access Denied", "Your user role does not have permission to access this screen.", "danger");
                return;
            }
        }

        // Toggle active sidebar tabs
        document.querySelectorAll(".sidebar-nav li").forEach(item => {
            if (item.getAttribute("data-view") === viewId) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });

        // Sync active state on bottom horizontal bar chips
        document.querySelectorAll("#bottom-bar-track .bottom-tab-chip").forEach(chip => {
            if (chip.getAttribute("data-view") === viewId) {
                chip.classList.add("active");
                chip.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                chip.classList.remove("active");
            }
        });

        // Hide all views and show target
        document.querySelectorAll(".content-view").forEach(view => {
            view.classList.remove("active");
        });
        
        const targetView = document.getElementById(`view-${viewId}`);
        if (targetView) {
            targetView.classList.add("active");
            activeView = viewId;
            
            // Format header title
            let cleanTitle = viewId.replace("-", " ");
            cleanTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);
            if (viewId === "sales") cleanTitle = "Sales Terminal (POS)";
            if (viewId === "receiving") cleanTitle = "Delivery Receiving Wizard";
            document.getElementById("current-view-title").textContent = cleanTitle;

            // Load view-specific actions
            onViewLoaded(viewId);
        }
    }

    function onViewLoaded(viewId) {
        const targetView = document.getElementById(`view-${viewId}`);
        if (!targetView) return;

        const oldHost = targetView.querySelector(".week6-state-host");
        if (oldHost) oldHost.remove();

        const stateHost = document.createElement("div");
        stateHost.className = "week6-state-host";
        targetView.prepend(stateHost);

        showLoadingState(
            stateHost,
            "Loading " + viewId.replace(/-/g, " ") + "...",
            "Please wait while this screen is being prepared."
        );

        const renderView = () => {
            if (viewId === "dashboard") updateDashboardStats();
            else if (viewId === "products") renderProductsTable();
            else if (viewId === "categories") renderCategoriesAndBrands();
            else if (viewId === "suppliers") renderSuppliersTable();
            else if (viewId === "purchase-orders") renderPurchaseOrdersTable();
            else if (viewId === "receiving") renderReceivingList();
            else if (viewId === "inventory") {
                renderInventoryMovements();
                checkNearExpirations();
            } else if (viewId === "sales") initPOS();
            else if (viewId === "customers") renderCustomersTable();
            else if (viewId === "employees") renderEmployeesTable();
            else if (viewId === "settings") loadUserAccounts();
            else if (viewId === "reports") initReportsView();
            else if (viewId === "audit-trail") renderAuditTrail();
        };

        setTimeout(() => {
            try {
                renderView();
                stateHost.remove();
            } catch (error) {
                console.error(`Failed to load ${viewId}:`, error);
                showErrorState(
                    stateHost,
                    "Unable to load this screen",
                    "Something went wrong while loading this section. Please try again.",
                    () => onViewLoaded(viewId)
                );
            }
        }, 150);
    }

    // Modal Control Helpers
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add("active");
            const body = modal.querySelector(".modal-body");
            if (body) body.scrollTop = 0;
            modal.scrollTop = 0;
        }
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove("active");
    }

    // Setup Modals general handlers
    document.querySelectorAll(".modal").forEach(modal => {
        modal.querySelectorAll(".close-modal-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                modal.classList.remove("active");
            });
        });
    });

    // --------------------------------------------------------------------------
    // Auth & Logins
    // --------------------------------------------------------------------------
    document.getElementById("login-form").addEventListener("submit", async function (e) {
        e.preventDefault();

        const roleVal = document.getElementById("login-role-select").value;
        const identifier = document.getElementById("login-username").value.trim().toLowerCase();
        const password = document.getElementById("login-password").value;

        if (!identifier || !password) return;

        const submitButton = this.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Signing In...';

        console.log("LOGIN DEBUG 1 - sending login request");
        console.log("LOGIN DEBUG 2 - identifier:", identifier);
        console.log("LOGIN DEBUG 3 - role:", roleVal);

        try {
            const response = await apiRequest("/auth/login", {
                method: "POST",
                body: JSON.stringify({ identifier, password, role: roleVal })
            });


        console.log("LOGIN DEBUG 4 - Laravel response:", response);
        console.log("LOGIN DEBUG 5 - token exists:", !!response.token);

            const user = response.user;
            const initials = (user.name || "User").split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
            localStorage.setItem("inventory_auth_token", response.token);

            completeLogin({
                id: user.id,
                username: user.username,
                email: user.email,
                name: user.name,
                role: user.role,
                status: user.status,
                initials
            }, response.token);
        } catch (error) {
            console.error("Laravel login failed:", error);
            showToast("Login Failed", error.message || "Unable to sign in.", "danger");
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = '<span>Sign In</span><i class="fa-solid fa-right-to-bracket"></i>';
        }
    });

    // Toggle password view
    document.getElementById("toggle-login-password").addEventListener("click", function () {
        const pwdInput = document.getElementById("login-password");
        const icon = this.querySelector("i");
        if (pwdInput.type === "password") {
            pwdInput.type = "text";
            icon.className = "fa-solid fa-eye-slash";
        } else {
            pwdInput.type = "password";
            icon.className = "fa-solid fa-eye";
        }
    });

    // Forgot password mock
    document.getElementById("forgot-password-link").addEventListener("click", function (e) {
        e.preventDefault();
        openModal("forgot-password-modal");
    });
    document.getElementById("send-reset-btn").addEventListener("click", function () {
        const email = document.getElementById("reset-email").value.trim();
        if (email) {
            closeModal("forgot-password-modal");
            showToast("Reset Requested", `A secure password reset link has been emailed to ${email}.`, "success");
        } else {
            showToast("Error", "Please provide a valid email address.", "warning");
        }
    });

    function completeLogin(user, token = null) {
    console.log("🟢 COMPLETE LOGIN START");
    console.log("🟢 user:", user);
    console.log("🟢 token exists:", !!token);

    currentUser = user;

    if (token) {
        localStorage.setItem("inventory_auth_token", token);
    }

    console.log(
        "🟢 token after save:",
        !!localStorage.getItem("inventory_auth_token")
    );

    document.getElementById("login-container").classList.add("hidden");
    document.getElementById("app-container").classList.remove("hidden");

    console.log(
        "🟢 login hidden:",
        document.getElementById("login-container").classList.contains("hidden")
    );

    console.log(
        "🟢 app hidden:",
        document.getElementById("app-container").classList.contains("hidden")
    );

    applyRolePermissions();

    logAudit(
        "Login",
        `User ${user.username} logged in successfully`
    );

    showToast(
        "Signed In",
        `Logged in as ${user.name} (${user.role})`,
        "success"
    );

    syncBackendCatalog();

    if (user.role === "Super Admin") {
        loadUserAccounts();
    }

    if (user.role === "Cashier") {
        switchView("sales");
    } else {
        switchView("dashboard");
    }

    triggerSystemAlerts();

    console.log("🟢 COMPLETE LOGIN FINISHED");
}

    document.getElementById("logout-btn").addEventListener("click", async function () {
        console.log("🚨 LOGOUT HANDLER TRIGGERED");
        console.log("🚨 currentUser at logout:", currentUser);
        console.log("🚨 token at logout:", localStorage.getItem("inventory_auth_token"));
        if (!currentUser) return;

        try {
            await apiRequest("/auth/logout", { method: "POST" });
        } catch (error) {
            console.warn("Laravel logout request failed:", error);
        }

        logAudit("Login", `User ${currentUser.username} logged out`);
        currentUser = null;
        localStorage.removeItem("inventory_auth_token");
        document.getElementById("app-container").classList.add("hidden");
        document.getElementById("login-container").classList.remove("hidden");
        document.getElementById("login-form").reset();
    });

    // Dashboard Stats & Charts
    // --------------------------------------------------------------------------
    function updateDashboardStats() {
        const prodCount = db.products.filter(p => p.status !== "Archived").length;
        const catCount = db.categories.length;
        const suppCount = db.suppliers.length;

        // Sales totals
        const todayStr = getFutureDate(0);
        const salesToday = db.sales.filter(s => s.date.startsWith(todayStr));
        const salesTodaySum = salesToday.reduce((acc, cur) => acc + cur.total, 0);

        const currentMonth = todayStr.substring(0, 7); // YYYY-MM
        const salesMonth = db.sales.filter(s => s.date.startsWith(currentMonth));
        const salesMonthSum = salesMonth.reduce((acc, cur) => acc + cur.total, 0);

        // Stock alerts
        let lowStockCount = 0;
        let outStockCount = 0;
        db.products.forEach(p => {
            if (p.status !== "Archived") {
                if (p.qty <= 0) outStockCount++;
                else if (p.qty <= 5) lowStockCount++; // low stock threshold is 5
            }
        });

        const pendingPos = db.purchaseOrders.filter(po => po.status === "Pending" || po.status === "Ordered" || po.status === "Approved").length;

        // Apply values to UI
        document.getElementById("dash-total-products").textContent = prodCount;
        document.getElementById("dash-total-categories").textContent = catCount;
        document.getElementById("dash-total-suppliers").textContent = suppCount;
        document.getElementById("dash-sales-today").textContent = formatCurrency(salesTodaySum);
        document.getElementById("dash-sales-count-today").textContent = `${salesToday.length} Transactions`;
        document.getElementById("dash-sales-month").textContent = formatCurrency(salesMonthSum);
        document.getElementById("dash-low-stock").textContent = lowStockCount;
        document.getElementById("dash-out-of-stock").textContent = outStockCount;
        document.getElementById("dash-pending-pos").textContent = pendingPos;

        renderDashRecentTransactions();
        renderDashCriticalNotifications();
        initDashboardCharts();
    }

    function renderDashRecentTransactions() {
        const tbody = document.getElementById("dash-recent-transactions");
        tbody.innerHTML = "";

        const recent = db.sales.slice(0, 5); // get first 5 elements
        if (recent.length === 0) {
            showEmptyState(tbody, "No recent transactions", "There are no sales transactions to display.");
            return;
        }

        recent.forEach(sale => {
            const itemsCount = sale.items.reduce((acc, item) => acc + item.qty, 0);
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><a href="#" class="font-mono text-primary view-receipt-btn" data-id="${sale.id}">${sale.receiptNo}</a></td>
                <td>${sale.date}</td>
                <td>${sale.cashier}</td>
                <td><span class="badge badge-info">${sale.paymentMethod}</span></td>
                <td>${itemsCount} items</td>
                <td class="font-mono font-weight-700 text-right">${formatCurrency(sale.total)}</td>
            `;
            tbody.appendChild(tr);
        });

        // Hook Receipt previews
        tbody.querySelectorAll(".view-receipt-btn").forEach(btn => {
            btn.addEventListener("click", function (e) {
                e.preventDefault();
                showReceiptModal(this.getAttribute("data-id"));
            });
        });
    }

    function renderDashCriticalNotifications() {
        const container = document.getElementById("dash-critical-notifs");
        container.innerHTML = "";

        let list = [];
        // Out of stocks
        db.products.forEach(p => {
            if (p.status !== "Archived") {
                if (p.qty <= 0) {
    });
})();
