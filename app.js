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
        localStorage.setItem("dabugss_db", JSON.stringify(db));
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

    // Toast Manager
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
            toast.style.animation = "slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) reverse forwards";
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
    document.getElementById("login-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const roleVal = document.getElementById("login-role-select").value;
        const userVal = document.getElementById("login-username").value.trim().toLowerCase();
        const pwdVal = document.getElementById("login-password").value;
        const enable2fa = false;

        let foundUser = null;
        if (roleVal === "Super Admin") {
            if (userVal === "superadmin" && pwdVal === "password") {
                foundUser = {
                    username: "superadmin",
                    name: "Super Admin",
                    role: "Super Admin",
                    initials: "SA"
                };
            }
        } else {
            // Check employees list matching username, role, and password
            const emp = db.employees.find(e => e.username.toLowerCase() === userVal && e.position === roleVal && e.status === "Active");
            if (emp && pwdVal === (emp.password || "password")) {
                foundUser = {
                    username: emp.username,
                    name: emp.name,
                    role: emp.position,
                    initials: emp.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
                };
            }
        }

        if (foundUser) {
            if (enable2fa) {
                // Show 2FA input modal
                openModal("mfa-modal");
                document.getElementById("submit-mfa-btn").onclick = function () {
                    const code = document.getElementById("mfa-code").value.trim();
                    if (code === "123456") {
                        closeModal("mfa-modal");
                        completeLogin(foundUser);
                    } else {
                        showToast("Verification Failed", "Incorrect 2FA code. Use 123456.", "danger");
                    }
                };
            } else {
                completeLogin(foundUser);
            }
        } else {
            showToast("Login Failed", "Invalid username or password for the selected account type.", "danger");
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

    function completeLogin(user) {
        currentUser = user;
        document.getElementById("login-container").classList.add("hidden");
        document.getElementById("app-container").classList.remove("hidden");
        applyRolePermissions();
        logAudit("Login", `User ${user.username} logged in successfully`);
        showToast("Signed In", `Logged in as ${user.name} (${user.role})`, "success");
        
        // Auto land on POS for cashiers, dashboard for others
        if (user.role === "Cashier") {
            switchView("sales");
        } else {
            switchView("dashboard");
        }
        
        // Start background warning loops
        triggerSystemAlerts();
    }

    document.getElementById("logout-btn").addEventListener("click", function () {
        if (!currentUser) return;
        logAudit("Login", `User ${currentUser.username} logged out`);
        currentUser = null;
        document.getElementById("app-container").classList.add("hidden");
        document.getElementById("login-container").classList.remove("hidden");
        document.getElementById("login-form").reset();
    });

    // --------------------------------------------------------------------------
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
                    list.push({ type: "out", text: `Product '${p.name}' is out of stock!`, ref: p.id });
                } else if (p.qty <= 5) {
                    list.push({ type: "low", text: `Product '${p.name}' is low on stock (${p.qty} ${p.unit} remaining)`, ref: p.id });
                }
                
                // Expiry Check
                if (p.expiration) {
                    const expDate = new Date(p.expiration);
                    const today = new Date();
                    const diffDays = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));
                    if (diffDays < 0) {
                        list.push({ type: "exp", text: `Product '${p.name}' expired on ${p.expiration}!`, ref: p.id });
                    } else if (diffDays <= 30) {
                        list.push({ type: "near", text: `Product '${p.name}' is expiring in ${diffDays} days (${p.expiration})`, ref: p.id });
                    }
                }
            }
        });

        if (list.length === 0) {
            container.innerHTML = `<div class="text-center text-muted py-3">All stocks healthy. No critical alerts.</div>`;
            return;
        }

        // Limit to 5 alerts
        list.slice(0, 5).forEach(alert => {
            const item = document.createElement("div");
            let badgeClass = "crit-low";
            let actionBtn = "Restock";
            let view = "products";
            
            if (alert.type === "out" || alert.type === "exp") {
                badgeClass = "crit-out";
            }
            if (alert.type === "exp") {
                actionBtn = "Write-off";
                view = "inventory";
            }

            item.className = `crit-notif-item ${badgeClass}`;
            item.innerHTML = `
                <span>${alert.text}</span>
                <button class="crit-notif-btn" data-view="${view}">${actionBtn}</button>
            `;
            container.appendChild(item);
        });

        container.querySelectorAll(".crit-notif-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const targetView = this.getAttribute("data-view");
                switchView(targetView);
            });
        });
    }

    // Chart JS Configs
    function initDashboardCharts() {
        // Destroy existing if present to avoid memory leak / overlaps
        if (charts.sales) charts.sales.destroy();
        if (charts.categories) charts.categories.destroy();

        // 1. Sales Chart
        const ctxSales = document.getElementById("monthlySalesChart").getContext("2d");
        const salesData = getMonthlySalesData();
        charts.sales = new Chart(ctxSales, {
            type: 'line',
            data: {
                labels: salesData.months,
                datasets: [{
                    label: 'Sales Revenue',
                    data: salesData.totals,
                    borderColor: '#36ca6d',
                    backgroundColor: 'rgba(54, 202, 109, 0.1)',
                    borderWidth: 2,
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#64748b' } },
                    x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#64748b' } }
                }
            }
        });

        // 2. Category Pie Chart
        const ctxCat = document.getElementById("inventoryCategoryChart").getContext("2d");
        const catData = getCategoryStockData();
        charts.categories = new Chart(ctxCat, {
            type: 'doughnut',
            data: {
                labels: catData.names,
                datasets: [{
                    data: catData.counts,
                    backgroundColor: ['#36ca6d', '#0d9488', '#8b5cf6', '#f59e0b', '#ec4899', '#f97316'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { color: '#64748b', boxWidth: 12 } }
                }
            }
        });
    }

    function getMonthlySalesData() {
        // Mock sales data for past 6 months
        const months = [];
        const totals = [];
        for (let i = 5; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            const mLabel = date.toLocaleString('default', { month: 'short' }) + " " + date.getFullYear().toString().substr(-2);
            months.push(mLabel);

            // Filter sales matching YYYY-MM
            const monthStr = date.toISOString().substring(0, 7);
            const sum = db.sales.filter(s => s.date.startsWith(monthStr)).reduce((acc, cur) => acc + cur.total, 0);
            
            // Add some base noise so graph looks realistic even if data is low
            totals.push(sum > 0 ? sum : Math.floor(Math.random() * 200 + 50));
        }
        return { months, totals };
    }

    function getCategoryStockData() {
        const names = [];
        const counts = [];
        db.categories.forEach(cat => {
            names.push(cat.name);
            const count = db.products
                .filter(p => p.category === cat.id && p.status !== "Archived")
                .reduce((acc, cur) => acc + cur.qty, 0);
            counts.push(count);
        });
        return { names, counts };
    }

    // --------------------------------------------------------------------------
    // Product Management Module
    // --------------------------------------------------------------------------
    let productsSearchTimeout = null;
    document.getElementById("products-search").addEventListener("input", function () {
        clearTimeout(productsSearchTimeout);
        productsSearchTimeout = setTimeout(renderProductsTable, 300);
    });
    document.getElementById("products-filter-category").addEventListener("change", renderProductsTable);
    document.getElementById("products-filter-stock").addEventListener("change", renderProductsTable);
    document.getElementById("products-filter-status").addEventListener("change", renderProductsTable);

    document.getElementById("add-product-btn").addEventListener("click", function () {
        document.getElementById("product-form").reset();
        document.getElementById("product-id").value = "";
        document.getElementById("product-modal-title").textContent = "Add New Product";
        document.getElementById("modal-barcode-preview").classList.add("hidden");
        populateDropdowns();
        openModal("product-modal");
    });

    document.getElementById("gen-barcode-btn").addEventListener("click", function () {
        const barcodeInput = document.getElementById("prod-barcode");
        const digits = "480" + Math.floor(100000000 + Math.random() * 900000000).toString();
        barcodeInput.value = digits;
        renderModalBarcode(digits);
    });

    function renderModalBarcode(digits) {
        const preview = document.getElementById("modal-barcode-preview");
        preview.innerHTML = `
            <div class="barcode-stripes"></div>
            <div class="barcode-digits">${digits}</div>
        `;
        preview.classList.remove("hidden");
    }

    // Modal populate dropdowns
    function populateDropdowns() {
        const catSelect = document.getElementById("prod-category");
        catSelect.innerHTML = db.categories.map(c => `<option value="${c.id}">${c.name}</option>`).join("");

        const bndSelect = document.getElementById("prod-brand");
        bndSelect.innerHTML = db.brands.map(b => `<option value="${b.id}">${b.name}</option>`).join("");

        const suppSelect = document.getElementById("prod-supplier");
        suppSelect.innerHTML = db.suppliers.map(s => `<option value="${s.id}">${s.company}</option>`).join("");

        // Also update filter dropdown in Products view
        const filterCat = document.getElementById("products-filter-category");
        filterCat.innerHTML = `<option value="">All Categories</option>` + db.categories.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
    }

    document.getElementById("product-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const id = document.getElementById("product-id").value;
        const name = document.getElementById("prod-name").value.trim();
        const sku = document.getElementById("prod-sku").value.trim();
        const barcode = document.getElementById("prod-barcode").value.trim();
        const category = document.getElementById("prod-category").value;
        const brand = document.getElementById("prod-brand").value;
        const supplier = document.getElementById("prod-supplier").value;
        const unit = document.getElementById("prod-unit").value;
        const purchasePrice = parseFloat(document.getElementById("prod-purchase-price").value);
        const sellingPrice = parseFloat(document.getElementById("prod-selling-price").value);
        const qty = parseInt(document.getElementById("prod-qty").value);
        const expiration = document.getElementById("prod-expiration").value;
        const desc = document.getElementById("prod-desc").value.trim();
        const img = document.getElementById("prod-image").value.trim();

        if (sellingPrice < purchasePrice) {
            showToast("Pricing Alert", "Selling price should not be lower than the purchase cost.", "warning");
        }

        if (id) {
            // Edit
            const prod = db.products.find(p => p.id === id);
            const oldQty = prod.qty;
            if (prod) {
                prod.name = name;
                prod.SKU = sku;
                prod.barcode = barcode;
                prod.category = category;
                prod.brand = brand;
                prod.supplier = supplier;
                prod.unit = unit;
                prod.purchasePrice = purchasePrice;
                prod.sellingPrice = sellingPrice;
                prod.qty = qty;
                prod.expiration = expiration;
                prod.description = desc;
                prod.image = img;

                // If quantity was altered manually, log stock movement history
                if (qty !== oldQty) {
                    const delta = qty - oldQty;
                    const logType = delta > 0 ? "Stock In" : "Stock Out";
                    db.inventoryHistory.unshift({
                        id: "h-" + Date.now(),
                        timestamp: formatDateTime(),
                        productId: id,
                        type: "Adjustment",
                        qty: Math.abs(delta),
                        source: delta > 0 ? "Manual Adjustment" : "System",
                        destination: delta > 0 ? "Warehouse Shelf" : "Write-Off",
                        reason: "Manual Product Catalog update by Administrator",
                        user: currentUser.name
                    });
                }

                logAudit("Product", `Updated product details for ${name} (SKU: ${sku})`);
                showToast("Product Updated", `Successfully saved changes to ${name}.`, "success");
            }
        } else {
            // New
            const newProd = {
                id: "prod-" + Date.now(),
                name, SKU: sku, barcode, category, brand, supplier, unit,
                purchasePrice, sellingPrice, qty, expiration, description: desc,
                image: img, status: "Active"
            };
            db.products.push(newProd);
            
            // Log inventory initial stock in
            if (qty > 0) {
                db.inventoryHistory.unshift({
                    id: "h-" + Date.now(),
                    timestamp: formatDateTime(),
                    productId: newProd.id,
                    type: "Stock In",
                    qty: qty,
                    source: "Supplier Delivery",
                    destination: "Main Warehouse",
                    reason: "Initial inventory registration",
                    user: currentUser.name
                });
            }
            logAudit("Product", `Registered new catalog product: ${name} (SKU: ${sku})`);
            showToast("Product Registered", `${name} added to the active catalog.`, "success");
        }

        saveDatabase();
        closeModal("product-modal");
        renderProductsTable();
    });

    function renderProductsTable() {
        const tbody = document.getElementById("products-table-body");
        tbody.innerHTML = "";

        const searchVal = document.getElementById("products-search").value.trim().toLowerCase();
        const catFilter = document.getElementById("products-filter-category").value;
        const stockFilter = document.getElementById("products-filter-stock").value;
        const statusFilter = document.getElementById("products-filter-status").value; // active or archived

        let filtered = db.products.filter(p => {
            // Archived status toggle
            if (statusFilter === "archived") {
                return p.status === "Archived";
            } else {
                return p.status !== "Archived";
            }
        });

        // Category Filter
        if (catFilter) {
            filtered = filtered.filter(p => p.category === catFilter);
        }

        // Stock Filter
        if (stockFilter) {
            if (stockFilter === "instock") filtered = filtered.filter(p => p.qty > 5);
            else if (stockFilter === "low") filtered = filtered.filter(p => p.qty > 0 && p.qty <= 5);
            else if (stockFilter === "critical") filtered = filtered.filter(p => p.qty > 0 && p.qty <= 2);
            else if (stockFilter === "outofstock") filtered = filtered.filter(p => p.qty <= 0);
        }

        // Search Query
        if (searchVal) {
            filtered = filtered.filter(p => {
                const catObj = db.categories.find(c => c.id === p.category);
                const brandObj = db.brands.find(b => b.id === p.brand);
                const suppObj = db.suppliers.find(s => s.id === p.supplier);
                return p.name.toLowerCase().includes(searchVal) ||
                    p.SKU.toLowerCase().includes(searchVal) ||
                    p.barcode.includes(searchVal) ||
                    (catObj && catObj.name.toLowerCase().includes(searchVal)) ||
                    (brandObj && brandObj.name.toLowerCase().includes(searchVal)) ||
                    (suppObj && suppObj.company.toLowerCase().includes(searchVal));
            });
        }

        if (filtered.length === 0) {
            showEmptyState(tbody, "No products found", "There are no products matching your current filters.");
            return;
        }

        filtered.forEach(p => {
            const catObj = db.categories.find(c => c.id === p.category);
            const brandObj = db.brands.find(b => b.id === p.brand);
            
            // Stock badge status
            let stockBadge = `<span class="badge badge-success">${p.qty} ${p.unit}</span>`;
            if (p.qty <= 0) stockBadge = `<span class="badge badge-danger">OUT OF STOCK</span>`;
            else if (p.qty <= 2) stockBadge = `<span class="badge badge-danger">${p.qty} ${p.unit} (CRITICAL)</span>`;
            else if (p.qty <= 5) stockBadge = `<span class="badge badge-warning">${p.qty} ${p.unit} (LOW)</span>`;

            // Expiry checks
            let expiryStr = p.expiration || '<span class="text-muted">—</span>';
            if (p.expiration) {
                const expDate = new Date(p.expiration);
                const diffDays = Math.ceil((expDate - new Date()) / (1000 * 60 * 60 * 24));
                if (diffDays < 0) {
                    expiryStr = `<span class="text-danger font-weight-700">${p.expiration} (EXPIRED)</span>`;
                } else if (diffDays <= 30) {
                    expiryStr = `<span class="text-warning font-weight-700">${p.expiration} (${diffDays}d)</span>`;
                }
            }

            // Image placeholder
            let imgHTML = `<div class="table-prod-img"><i class="fa-solid fa-box"></i></div>`;
            if (p.image) {
                imgHTML = `<img src="${p.image}" class="table-prod-img" alt="${p.name}" onerror="this.outerHTML='<div class=&quot;table-prod-img&quot;><i class=&quot;fa-solid fa-box&quot;></i></div>'">`;
            }

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${imgHTML}</td>
                <td>
                    <strong>${p.name}</strong>
                    <div class="prod-details-meta">${p.description || "No description provided."}</div>
                </td>
                <td class="font-mono">
                    <div>SKU: ${p.SKU}</div>
                    <div class="text-meta">Barcode: ${p.barcode || "N/A"}</div>
                </td>
                <td>
                    <div>${catObj ? catObj.name : "N/A"}</div>
                    <div class="text-meta">Brand: ${brandObj ? brandObj.name : "N/A"}</div>
                </td>
                <td class="font-mono">
                    <div>Cost: ${formatCurrency(p.purchasePrice)}</div>
                    <div class="text-primary font-weight-700">Retail: ${formatCurrency(p.sellingPrice)}</div>
                </td>
                <td>${stockBadge}</td>
                <td>${expiryStr}</td>
                <td>
                    <span class="badge ${p.status === 'Active' ? 'badge-success' : 'badge-danger'}">${p.status}</span>
                </td>
                <td class="text-right">
                    <div class="flex-actions justify-end">
                        ${checkPermission("manage_products") ? `
                            <button class="btn btn-secondary btn-sm edit-prod-btn" data-id="${p.id}" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
                            ${p.status === 'Active' ? 
                                `<button class="btn btn-warning btn-sm archive-prod-btn" data-id="${p.id}" title="Archive"><i class="fa-solid fa-box-archive"></i></button>` : 
                                `<button class="btn btn-success btn-sm restore-prod-btn" data-id="${p.id}" title="Restore"><i class="fa-solid fa-trash-can-arrow-up"></i></button>`
                            }
                            <button class="btn btn-danger btn-sm delete-prod-btn" data-id="${p.id}" title="Delete Permanently"><i class="fa-solid fa-trash"></i></button>
                        ` : `
                            <span class="text-muted text-meta">Read-Only</span>
                        `}
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });

        // Hook Actions
        tbody.querySelectorAll(".edit-prod-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                editProduct(this.getAttribute("data-id"));
            });
        });
        tbody.querySelectorAll(".archive-prod-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                toggleProductArchive(this.getAttribute("data-id"), true);
            });
        });
        tbody.querySelectorAll(".restore-prod-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                toggleProductArchive(this.getAttribute("data-id"), false);
            });
        });
        tbody.querySelectorAll(".delete-prod-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                deleteProductPermanently(this.getAttribute("data-id"));
            });
        });
    }

    function editProduct(id) {
        const prod = db.products.find(p => p.id === id);
        if (!prod) return;
        populateDropdowns();
        
        document.getElementById("product-id").value = prod.id;
        document.getElementById("prod-name").value = prod.name;
        document.getElementById("prod-sku").value = prod.SKU;
        document.getElementById("prod-barcode").value = prod.barcode;
        document.getElementById("prod-category").value = prod.category;
        document.getElementById("prod-brand").value = prod.brand;
        document.getElementById("prod-supplier").value = prod.supplier;
        document.getElementById("prod-unit").value = prod.unit;
        document.getElementById("prod-purchase-price").value = prod.purchasePrice;
        document.getElementById("prod-selling-price").value = prod.sellingPrice;
        document.getElementById("prod-qty").value = prod.qty;
        document.getElementById("prod-expiration").value = prod.expiration;
        document.getElementById("prod-desc").value = prod.description;
        document.getElementById("prod-image").value = prod.image;

        document.getElementById("product-modal-title").textContent = "Edit Product Details";
        if (prod.barcode) {
            renderModalBarcode(prod.barcode);
        } else {
            document.getElementById("modal-barcode-preview").classList.add("hidden");
        }

        openModal("product-modal");
    }

    function toggleProductArchive(id, shouldArchive) {
        const prod = db.products.find(p => p.id === id);
        if (prod) {
            prod.status = shouldArchive ? "Archived" : "Active";
            saveDatabase();
            logAudit("Product", `${shouldArchive ? 'Archived' : 'Restored'} product ${prod.name}`);
            showToast("Database Updated", `Product ${prod.name} has been ${shouldArchive ? 'archived' : 'restored'}.`, "success");
            renderProductsTable();
        }
    }

    function deleteProductPermanently(id) {
        const prod = db.products.find(p => p.id === id);
        if (!prod) return;

        if (confirm(`ARE YOU SURE you want to PERMANENTLY DELETE "${prod.name}"? This action wipes out its inventory record and cannot be undone.`)) {
            db.products = db.products.filter(p => p.id !== id);
            saveDatabase();
            logAudit("Product", `Permanently deleted product: ${prod.name}`);
            showToast("Product Deleted", "Product record cleared from database.", "success");
            renderProductsTable();
        }
    }

    // --------------------------------------------------------------------------
    // Category & Brand Management Module
    // --------------------------------------------------------------------------
    document.getElementById("add-category-btn").addEventListener("click", function () {
        document.getElementById("category-form").reset();
        document.getElementById("category-id").value = "";
        document.getElementById("category-modal-title").textContent = "Add Product Category";
        openModal("category-modal");
    });

    document.getElementById("category-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const id = document.getElementById("category-id").value;
        const name = document.getElementById("cat-name").value.trim();
        const desc = document.getElementById("cat-desc").value.trim();

        if (id) {
            const cat = db.categories.find(c => c.id === id);
            if (cat) {
                cat.name = name;
                cat.desc = desc;
                logAudit("Settings", `Modified Category: ${name}`);
            }
        } else {
            db.categories.push({
                id: "cat-" + Date.now(),
                name, desc
            });
            logAudit("Settings", `Created Category: ${name}`);
        }

        saveDatabase();
        closeModal("category-modal");
        renderCategoriesAndBrands();
        populateDropdowns();
    });

    document.getElementById("add-brand-btn").addEventListener("click", function () {
        document.getElementById("brand-form").reset();
        document.getElementById("brand-id").value = "";
        document.getElementById("brand-modal-title").textContent = "Add Product Brand";
        openModal("brand-modal");
    });

    document.getElementById("brand-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const id = document.getElementById("brand-id").value;
        const name = document.getElementById("brand-name").value.trim();

        if (id) {
            const bnd = db.brands.find(b => b.id === id);
            if (bnd) {
                bnd.name = name;
                logAudit("Settings", `Modified Brand: ${name}`);
            }
        } else {
            db.brands.push({
                id: "bnd-" + Date.now(),
                name
            });
            logAudit("Settings", `Created Brand: ${name}`);
        }

        saveDatabase();
        closeModal("brand-modal");
        renderCategoriesAndBrands();
        populateDropdowns();
    });

    function renderCategoriesAndBrands() {
        const catBody = document.getElementById("categories-table-body");
        catBody.innerHTML = "";
        if (db.categories.length === 0) {
            showEmptyState(catBody, "No categories found", "There are no product categories to display.");
        } else {
            db.categories.forEach(c => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong>${c.name}</strong></td>
                <td>${c.desc || '<span class="text-meta">No description.</span>'}</td>
                <td>
                    <button class="btn btn-secondary btn-sm edit-cat-btn" data-id="${c.id}"><i class="fa-solid fa-pencil"></i></button>
                    <button class="btn btn-danger btn-sm delete-cat-btn" data-id="${c.id}"><i class="fa-solid fa-trash"></i></button>
                </td>
            `;
            catBody.appendChild(tr);
        });
        }

        const bndBody = document.getElementById("brands-table-body");
        bndBody.innerHTML = "";
        if (db.brands.length === 0) {
            showEmptyState(bndBody, "No brands found", "There are no product brands to display.");
        } else {
            db.brands.forEach(b => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong>${b.name}</strong></td>
                <td>
                    <button class="btn btn-secondary btn-sm edit-bnd-btn" data-id="${b.id}"><i class="fa-solid fa-pencil"></i></button>
                    <button class="btn btn-danger btn-sm delete-bnd-btn" data-id="${b.id}"><i class="fa-solid fa-trash"></i></button>
                </td>
            `;
            bndBody.appendChild(tr);
        });

        // Hook edit/delete category
        catBody.querySelectorAll(".edit-cat-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const cat = db.categories.find(c => c.id === this.getAttribute("data-id"));
                if (cat) {
                    document.getElementById("category-id").value = cat.id;
                    document.getElementById("cat-name").value = cat.name;
                    document.getElementById("cat-desc").value = cat.desc;
                    document.getElementById("category-modal-title").textContent = "Edit Category";
                    openModal("category-modal");
                }
            });
        });
        catBody.querySelectorAll(".delete-cat-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const id = this.getAttribute("data-id");
                if (confirm("Delete Category? Any product linked to this category will display N/A.")) {
                    db.categories = db.categories.filter(c => c.id !== id);
                    saveDatabase();
                    renderCategoriesAndBrands();
                }
            });
        });

        // Hook edit/delete brand
        bndBody.querySelectorAll(".edit-bnd-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const bnd = db.brands.find(b => b.id === this.getAttribute("data-id"));
                if (bnd) {
                    document.getElementById("brand-id").value = bnd.id;
                    document.getElementById("brand-name").value = bnd.name;
                    document.getElementById("brand-modal-title").textContent = "Edit Brand";
                    openModal("brand-modal");
                }
            });
        });
        bndBody.querySelectorAll(".delete-bnd-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const id = this.getAttribute("data-id");
                if (confirm("Delete Brand? Any product linked to this brand will display N/A.")) {
                    db.brands = db.brands.filter(b => b.id !== id);
                    saveDatabase();
                    renderCategoriesAndBrands();
                }
            });
        });
    }

    // --------------------------------------------------------------------------
    // Supplier Management Module
    // --------------------------------------------------------------------------
    let supplierSearchTimeout = null;
    document.getElementById("suppliers-search").addEventListener("input", function () {
        clearTimeout(supplierSearchTimeout);
        supplierSearchTimeout = setTimeout(renderSuppliersTable, 300);
    });

    document.getElementById("add-supplier-btn").addEventListener("click", function () {
        document.getElementById("supplier-form").reset();
        document.getElementById("supplier-id").value = "";
        document.getElementById("supplier-modal-title").textContent = "Add Supplier Company";
        openModal("supplier-modal");
    });

    document.getElementById("supplier-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const id = document.getElementById("supplier-id").value;
        const company = document.getElementById("supp-company").value.trim();
        const contact = document.getElementById("supp-contact").value.trim();
        const phone = document.getElementById("supp-phone").value.trim();
        const email = document.getElementById("supp-email").value.trim();
        const address = document.getElementById("supp-address").value.trim();

        if (id) {
            const sup = db.suppliers.find(s => s.id === id);
            if (sup) {
                sup.company = company;
                sup.contact = contact;
                sup.phone = phone;
                sup.email = email;
                sup.address = address;
                logAudit("Settings", `Modified Supplier Partner: ${company}`);
            }
        } else {
            db.suppliers.push({
                id: "sup-" + Date.now(),
                company, contact, phone, email, address
            });
            logAudit("Settings", `Created Supplier Partner: ${company}`);
        }

        saveDatabase();
        closeModal("supplier-modal");
        renderSuppliersTable();
    });

    function renderSuppliersTable() {
    const tbody = document.getElementById("suppliers-table-body");
    tbody.innerHTML = "";

    const query = document.getElementById("suppliers-search").value.trim().toLowerCase();
    let filtered = db.suppliers;

    if (query) {
        filtered = filtered.filter(s =>
            s.company.toLowerCase().includes(query) ||
            s.contact.toLowerCase().includes(query) ||
            s.email.toLowerCase().includes(query)
        );
    }

    if (filtered.length === 0) {
        showEmptyState(
            tbody,
            "No suppliers found",
            "There are no suppliers matching your search."
        );
        return;
    }

        filtered.forEach(s => {
            const poCount = db.purchaseOrders.filter(po => po.supplierId === s.id).length;
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong>${s.company}</strong></td>
                <td>${s.contact}</td>
                <td>
                    <div>${s.phone}</div>
                    <div class="text-meta">${s.email}</div>
                </td>
                <td>${s.address}</td>
                <td><span class="badge badge-info">${poCount} Purchase Orders</span></td>
                <td class="text-right">
                    <button class="btn btn-secondary btn-sm edit-sup-btn" data-id="${s.id}"><i class="fa-solid fa-pencil"></i></button>
                    <button class="btn btn-danger btn-sm delete-sup-btn" data-id="${s.id}"><i class="fa-solid fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        tbody.querySelectorAll(".edit-sup-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const s = db.suppliers.find(sup => sup.id === this.getAttribute("data-id"));
                if (s) {
                    document.getElementById("supplier-id").value = s.id;
                    document.getElementById("supp-company").value = s.company;
                    document.getElementById("supp-contact").value = s.contact;
                    document.getElementById("supp-phone").value = s.phone;
                    document.getElementById("supp-email").value = s.email;
                    document.getElementById("supp-address").value = s.address;
                    document.getElementById("supplier-modal-title").textContent = "Edit Supplier Company";
                    openModal("supplier-modal");
                }
            });
        });

        tbody.querySelectorAll(".delete-sup-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const id = this.getAttribute("data-id");
                if (confirm("Delete supplier partner? This will disconnect catalog items linked to this company.")) {
                    db.suppliers = db.suppliers.filter(s => s.id !== id);
                    saveDatabase();
                    renderSuppliersTable();
                }
            });
        });
    }

    // --------------------------------------------------------------------------
    // Purchase Orders Module
    // --------------------------------------------------------------------------
    document.getElementById("create-po-btn").addEventListener("click", function () {
        document.getElementById("po-form").reset();
        selectedPOItems = [];
        updatePOModalTable();
        
        // Pop dropdowns
        const suppSelect = document.getElementById("po-supplier-select");
        suppSelect.innerHTML = `<option value="">Choose Supplier...</option>` + db.suppliers.map(s => `<option value="${s.id}">${s.company}</option>`).join("");
        
        // Product selector pop
        const prodSelect = document.getElementById("po-item-select-product");
        prodSelect.innerHTML = `<option value="">Select product to order...</option>` + 
            db.products.filter(p => p.status !== "Archived").map(p => `<option value="${p.id}">${p.name} (SKU: ${p.SKU})</option>`).join("");

        document.getElementById("po-expected-date").value = getFutureDate(7); // default 7 days expectation
        openModal("po-modal");
    });

    document.getElementById("po-add-item-btn").addEventListener("click", function () {
        const prodId = document.getElementById("po-item-select-product").value;
        const qty = parseInt(document.getElementById("po-item-qty").value);

        if (!prodId || isNaN(qty) || qty <= 0) {
            showToast("Alert", "Choose a valid product and quantity.", "warning");
            return;
        }

        const prod = db.products.find(p => p.id === prodId);
        if (!prod) return;

        // Check if already in active order
        const existing = selectedPOItems.find(item => item.productId === prodId);
        if (existing) {
            existing.qty += qty;
        } else {
            selectedPOItems.push({
                productId: prodId,
                name: prod.name,
                cost: prod.purchasePrice,
                qty: qty
            });
        }

        updatePOModalTable();
        document.getElementById("po-item-qty").value = "";
    });

    function updatePOModalTable() {
        const tbody = document.getElementById("po-added-items-body");
        tbody.innerHTML = "";

        if (selectedPOItems.length === 0) {
            tbody.appendChild(document.getElementById("po-empty-row"));
            document.getElementById("save-po-submit-btn").disabled = true;
            return;
        }

        let totalSum = 0;
        selectedPOItems.forEach((item, index) => {
            const costTotal = item.cost * item.qty;
            totalSum += costTotal;

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong>${item.name}</strong></td>
                <td class="font-mono">${formatCurrency(item.cost)}</td>
                <td>
                    <input type="number" min="1" value="${item.qty}" class="w-80 po-qty-edit" data-index="${index}">
                </td>
                <td class="font-mono">${formatCurrency(costTotal)}</td>
                <td class="text-right">
                    <button type="button" class="btn btn-danger btn-sm remove-po-item-btn" data-index="${index}"><i class="fa-solid fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        document.getElementById("save-po-submit-btn").disabled = false;

        // Wire events inside modal table
        tbody.querySelectorAll(".po-qty-edit").forEach(input => {
            input.addEventListener("change", function () {
                const idx = parseInt(this.getAttribute("data-index"));
                const val = parseInt(this.value);
                if (val > 0) {
                    selectedPOItems[idx].qty = val;
                    updatePOModalTable();
                }
            });
        });

        tbody.querySelectorAll(".remove-po-item-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const idx = parseInt(this.getAttribute("data-index"));
                selectedPOItems.splice(idx, 1);
                updatePOModalTable();
            });
        });
    }

    document.getElementById("po-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const supplierId = document.getElementById("po-supplier-select").value;
        const expectedDate = document.getElementById("po-expected-date").value;

        if (!supplierId || selectedPOItems.length === 0) return;

        const nextNum = 10001 + db.purchaseOrders.length;
        const totalCost = selectedPOItems.reduce((acc, cur) => acc + (cur.cost * cur.qty), 0);

        const newPO = {
            id: "po-" + Date.now(),
            poNumber: `PO-${nextNum}`,
            supplierId,
            orderDate: getFutureDate(0),
            expectedDate,
            items: selectedPOItems,
            totalCost,
            status: "Pending" // starts pending approval
        };

        db.purchaseOrders.unshift(newPO);
        saveDatabase();
        closeModal("po-modal");
        renderPurchaseOrdersTable();
        logAudit("Inventory", `Drafted new Purchase Order ${newPO.poNumber} ($${totalCost.toFixed(2)})`);
        showToast("PO Generated", `Purchase Order ${newPO.poNumber} created and awaiting approval.`, "success");
    });

    function renderPurchaseOrdersTable() {
        const tbody = document.getElementById("po-table-body");
        tbody.innerHTML = "";

        const query = document.getElementById("po-search").value.trim().toLowerCase();
        const filterStatus = document.getElementById("po-filter-status").value;

        let filtered = db.purchaseOrders;
        if (filterStatus) {
            filtered = filtered.filter(po => po.status === filterStatus);
        }

        if (query) {
            filtered = filtered.filter(po => {
                const s = db.suppliers.find(sup => sup.id === po.supplierId);
                return po.poNumber.toLowerCase().includes(query) || (s && s.company.toLowerCase().includes(query));
            });
        }

        if (filtered.length === 0) {
            showEmptyState(tbody, "No purchase orders found", "There are no purchase orders matching your current filters.");
            return;
        }

        filtered.forEach(po => {
            const s = db.suppliers.find(sup => sup.id === po.supplierId);
            const itemsCount = po.items.reduce((acc, item) => acc + item.qty, 0);

            let statusBadge = `<span class="badge badge-warning">PENDING</span>`;
            if (po.status === "Approved") statusBadge = `<span class="badge badge-info">APPROVED</span>`;
            if (po.status === "Ordered") statusBadge = `<span class="badge badge-primary">ORDERED</span>`;
            if (po.status === "Received") statusBadge = `<span class="badge badge-success">RECEIVED</span>`;
            if (po.status === "Cancelled") statusBadge = `<span class="badge badge-danger">CANCELLED</span>`;

            // Action row permissions logic
            let actionButtons = "";
            const isPending = po.status === "Pending";
            const isApproved = po.status === "Approved";
            const isOrdered = po.status === "Ordered";

            if (checkPermission("manage_employees") && isPending) { // Admin/Superadmin can approve POs
                actionButtons += `<button class="btn btn-success btn-sm approve-po-btn" data-id="${po.id}">Approve</button>`;
            }
            if (isApproved) {
                actionButtons += `<button class="btn btn-primary btn-sm order-po-btn" data-id="${po.id}">Send Order</button>`;
            }
            if ((isPending || isApproved || isOrdered) && po.status !== "Received" && po.status !== "Cancelled") {
                actionButtons += `<button class="btn btn-danger btn-sm cancel-po-btn ml-2" data-id="${po.id}">Cancel</button>`;
            }
            if (po.status === "Received") {
                actionButtons += `<span class="text-muted text-meta">Processed</span>`;
            }

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong class="font-mono">${po.poNumber}</strong></td>
                <td>${s ? s.company : "N/A"}</td>
                <td>${po.orderDate}</td>
                <td>${po.expectedDate}</td>
                <td>${itemsCount} items</td>
                <td class="font-mono font-weight-700">${formatCurrency(po.totalCost)}</td>
                <td>${statusBadge}</td>
                <td class="text-right">${actionButtons}</td>
            `;
            tbody.appendChild(tr);
        });

        // wire events
        tbody.querySelectorAll(".approve-po-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                updatePOStatus(this.getAttribute("data-id"), "Approved");
            });
        });
        tbody.querySelectorAll(".order-po-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                updatePOStatus(this.getAttribute("data-id"), "Ordered");
            });
        });
        tbody.querySelectorAll(".cancel-po-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                updatePOStatus(this.getAttribute("data-id"), "Cancelled");
            });
        });
    }

    function updatePOStatus(id, status) {
        const po = db.purchaseOrders.find(o => o.id === id);
        if (po) {
            po.status = status;
            saveDatabase();
            logAudit("Inventory", `Purchase Order ${po.poNumber} marked as ${status}`);
            showToast("Order Updated", `PO status updated to ${status}.`, "success");
            renderPurchaseOrdersTable();
        }
    }

    // --------------------------------------------------------------------------
    // Receiving (Deliveries) Module
    // --------------------------------------------------------------------------
    function renderReceivingList() {
        const tbody = document.getElementById("receiving-pos-table-body");
        tbody.innerHTML = "";

        // Only show Approved or Ordered POs for receiving
        const list = db.purchaseOrders.filter(po => po.status === "Approved" || po.status === "Ordered");

        if (list.length === 0) {
            showEmptyState(tbody, "No pending deliveries", "Create and authorize a purchase order before receiving a delivery.");
            return;
        }

        list.forEach(po => {
            const s = db.suppliers.find(sup => sup.id === po.supplierId);
            const itemsCount = po.items.reduce((acc, item) => acc + item.qty, 0);

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong class="font-mono">${po.poNumber}</strong></td>
                <td>${s ? s.company : "N/A"}</td>
                <td>${itemsCount} items</td>
                <td class="font-mono">${formatCurrency(po.totalCost)}</td>
                <td><span class="badge badge-info">${po.status}</span></td>
                <td>
                    <button class="btn btn-primary btn-sm start-recv-btn" data-id="${po.id}"><i class="fa-solid fa-truck-loading"></i> Process</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        tbody.querySelectorAll(".start-recv-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                initReceivingWizard(this.getAttribute("data-id"));
            });
        });
    }

    function initReceivingWizard(poId) {
        const po = db.purchaseOrders.find(o => o.id === poId);
        if (!po) return;

        activeReceivingPO = po;
        document.getElementById("receiving-placeholder").classList.add("hidden");
        
        const form = document.getElementById("receiving-active-form");
        form.classList.remove("hidden");

        document.getElementById("receiving-po-title").textContent = `Receive Delivery: ${po.poNumber}`;
        const s = db.suppliers.find(sup => sup.id === po.supplierId);
        document.getElementById("receiving-po-supplier").textContent = s ? s.company : "Supplier";
        document.getElementById("receiving-delivery-date").value = getFutureDate(0);

        // Populate items to check
        const itemsBody = document.getElementById("receiving-items-body");
        itemsBody.innerHTML = "";
        
        po.items.forEach((item, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>
                    <strong>${item.name}</strong>
                </td>
                <td class="font-mono text-center">${item.qty}</td>
                <td>
                    <input type="number" min="0" value="${item.qty}" class="recv-qty-input" data-index="${index}">
                </td>
            `;
            itemsBody.appendChild(tr);
        });
    }

    // simulated barcode scanning on delivery
    document.getElementById("receiving-barcode-scan-btn").addEventListener("click", function () {
        const input = document.getElementById("receiving-barcode-scan");
        const val = input.value.trim();
        if (!val) return;

        // find product matching barcode in this PO
        const prod = db.products.find(p => p.barcode === val);
        if (!prod) {
            showToast("Scanner Alert", "Product not found in system database.", "danger");
            return;
        }

        const itemIdx = activeReceivingPO.items.findIndex(item => item.productId === prod.id);
        if (itemIdx === -1) {
            showToast("Scanner Alert", "This product is not listed in this Purchase Order.", "warning");
            return;
        }

        // Increment receiving value
        const inputs = document.querySelectorAll(".recv-qty-input");
        const matchInput = inputs[itemIdx];
        if (matchInput) {
            const currentVal = parseInt(matchInput.value) || 0;
            matchInput.value = currentVal + 1;
            showToast("Product Scanned", `Verified 1 unit of ${prod.name}`, "success");
        }
        input.value = "";
    });

    document.getElementById("cancel-receiving-btn").addEventListener("click", function () {
        activeReceivingPO = null;
        document.getElementById("receiving-placeholder").classList.remove("hidden");
        document.getElementById("receiving-active-form").classList.add("hidden");
    });

    document.getElementById("save-receiving-btn").addEventListener("click", function () {
        if (!activeReceivingPO) return;

        const inputs = document.querySelectorAll(".recv-qty-input");
        const actualDeliveryDate = document.getElementById("receiving-delivery-date").value;

        // Apply quantities and update product inventories
        inputs.forEach(input => {
            const idx = parseInt(input.getAttribute("data-index"));
            const receivedQty = parseInt(input.value) || 0;
            const poItem = activeReceivingPO.items[idx];
            
            if (receivedQty > 0) {
                const prod = db.products.find(p => p.id === poItem.productId);
                if (prod) {
                    const oldQty = prod.qty;
                    prod.qty += receivedQty; // Stock incremented!
                    
                    // Log movement
                    db.inventoryHistory.unshift({
                        id: "h-" + Date.now() + idx,
                        timestamp: formatDateTime(),
                        productId: prod.id,
                        type: "Stock In",
                        qty: receivedQty,
                        source: `PO Receipt ${activeReceivingPO.poNumber}`,
                        destination: "Warehouse / Store Shelf",
                        reason: "Delivery order fully received and loaded",
                        user: currentUser.name
                    });
                }
            }
        });

        // Set status
        activeReceivingPO.status = "Received";
        activeReceivingPO.actualDeliveryDate = actualDeliveryDate;
        
        saveDatabase();
        logAudit("Inventory", `Received shipments for Purchase Order ${activeReceivingPO.poNumber}`);
        showToast("Delivery Logged", "Stock counts updated successfully.", "success");
        
        // Reset wizard
        activeReceivingPO = null;
        document.getElementById("receiving-placeholder").classList.remove("hidden");
        document.getElementById("receiving-active-form").classList.add("hidden");
        
        renderReceivingList();
    });

    // --------------------------------------------------------------------------
    // Inventory History & Movements
    // --------------------------------------------------------------------------
    document.getElementById("inventory-filter-type").addEventListener("change", renderInventoryMovements);
    document.getElementById("inventory-search").addEventListener("input", renderInventoryMovements);

    document.getElementById("inventory-adjust-btn").addEventListener("click", function () {
        document.getElementById("inventory-adjust-form").reset();
        const select = document.getElementById("adj-product");
        select.innerHTML = `<option value="">Select Product...</option>` + 
            db.products.filter(p => p.status !== "Archived").map(p => `<option value="${p.id}">${p.name} (SKU: ${p.SKU}) [Qty: ${p.qty}]</option>`).join("");
        openModal("inventory-adjust-modal");
    });

    document.getElementById("inventory-adjust-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const prodId = document.getElementById("adj-product").value;
        const type = document.getElementById("adj-type").value;
        const qty = parseInt(document.getElementById("adj-qty").value);
        const reason = document.getElementById("adj-reason").value.trim();

        if (!prodId || isNaN(qty) || qty <= 0) return;

        const prod = db.products.find(p => p.id === prodId);
        if (!prod) return;

        const oldQty = prod.qty;
        let newQty = oldQty;

        if (type === "Stock In") {
            newQty = oldQty + qty;
        } else if (type === "Stock Out" || type === "Damaged" || type === "Expired") {
            if (qty > oldQty) {
                showToast("Invalid Count", "Cannot write-off more stock than is physically present.", "danger");
                return;
            }
            newQty = oldQty - qty;
        } else if (type === "Adjustment") {
            newQty = qty; // correction sync
        }

        prod.qty = newQty;

        // Log transaction history
        db.inventoryHistory.unshift({
            id: "h-" + Date.now(),
            timestamp: formatDateTime(),
            productId: prodId,
            type: type,
            qty: type === "Adjustment" ? Math.abs(newQty - oldQty) : qty,
            source: type === "Stock In" ? "Adjustment In" : "Retail Store Shelf",
            destination: type === "Stock In" ? "Warehouse Shelves" : `${type} Write-Off`,
            reason: reason,
            user: currentUser.name
        });

        saveDatabase();
        closeModal("inventory-adjust-modal");
        renderInventoryMovements();
        logAudit("Inventory", `Stock Adjustment for ${prod.name} (${type}: Qty altered from ${oldQty} to ${newQty})`);
        showToast("Stock Adjusted", `${prod.name} inventory count corrected.`, "success");
    });

    document.getElementById("inventory-transfer-btn").addEventListener("click", function () {
        document.getElementById("inventory-transfer-form").reset();
        const select = document.getElementById("xfer-product");
        select.innerHTML = `<option value="">Select Product...</option>` + 
            db.products.filter(p => p.status !== "Archived").map(p => `<option value="${p.id}">${p.name} (SKU: ${p.SKU}) [Qty: ${p.qty}]</option>`).join("");
        openModal("inventory-transfer-modal");
    });

    document.getElementById("inventory-transfer-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const prodId = document.getElementById("xfer-product").value;
        const source = document.getElementById("xfer-source").value;
        const dest = document.getElementById("xfer-destination").value;
        const qty = parseInt(document.getElementById("xfer-qty").value);
        const notes = document.getElementById("xfer-notes").value.trim();

        if (!prodId || isNaN(qty) || qty <= 0) return;
        if (source === dest) {
            showToast("Invalid Transfer", "Source and destination locations must differ.", "warning");
            return;
        }

        const prod = db.products.find(p => p.id === prodId);
        if (!prod) return;

        if (qty > prod.qty) {
            showToast("Invalid Transfer", "Quantity exceeds current stock level.", "danger");
            return;
        }

        // Record movement in history list
        db.inventoryHistory.unshift({
            id: "h-" + Date.now(),
            timestamp: formatDateTime(),
            productId: prodId,
            type: "Transfer",
            qty: qty,
            source: source,
            destination: dest,
            reason: notes || "Standard intra-location stock relocation",
            user: currentUser.name
        });

        saveDatabase();
        closeModal("inventory-transfer-modal");
        renderInventoryMovements();
        logAudit("Inventory", `Intra-depot stock transfer: ${qty} units of ${prod.name} from ${source} to ${dest}`);
        showToast("Transfer Successful", "Stock transfer completed.", "success");
    });

    function renderInventoryMovements() {
        const tbody = document.getElementById("inventory-table-body");
        tbody.innerHTML = "";

        const typeFilter = document.getElementById("inventory-filter-type").value;
        const query = document.getElementById("inventory-search").value.trim().toLowerCase();

        let filtered = db.inventoryHistory;
        if (typeFilter) {
            filtered = filtered.filter(h => h.type === typeFilter);
        }

        if (query) {
            filtered = filtered.filter(h => {
                const prod = db.products.find(p => p.id === h.productId);
                return (prod && prod.name.toLowerCase().includes(query)) || h.reason.toLowerCase().includes(query);
            });
        }

        if (filtered.length === 0) {
            showEmptyState(tbody, "No stock movements found", "There are no inventory movements matching your current filters.");
            return;
        }

        filtered.forEach(h => {
            const prod = db.products.find(p => p.id === h.productId);
            const tr = document.createElement("tr");
            
            let typeBadge = `<span class="badge badge-success">${h.type}</span>`;
            if (h.type === "Stock Out") typeBadge = `<span class="badge badge-primary">${h.type}</span>`;
            if (h.type === "Transfer") typeBadge = `<span class="badge badge-info">${h.type}</span>`;
            if (h.type === "Adjustment") typeBadge = `<span class="badge badge-warning">${h.type}</span>`;
            if (h.type === "Damaged" || h.type === "Expired") typeBadge = `<span class="badge badge-danger">${h.type}</span>`;

            tr.innerHTML = `
                <td>${h.timestamp}</td>
                <td>
                    <strong>${prod ? prod.name : 'Unknown Product'}</strong>
                    <div class="text-meta">SKU: ${prod ? prod.SKU : 'N/A'}</div>
                </td>
                <td>${typeBadge}</td>
                <td class="font-mono font-weight-700">${h.qty} ${prod ? prod.unit : 'pcs'}</td>
                <td>
                    <div class="text-meta">From: ${h.source}</div>
                    <div class="text-meta">To: ${h.destination}</div>
                </td>
                <td>${h.reason}</td>
                <td>${h.user}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Periodic Check Expirations & Low Stocks
    function triggerSystemAlerts() {
        checkNearExpirations();
        checkLowStocks();
    }

    function checkNearExpirations() {
        let expired = 0;
        let nearExp = 0;
        const today = new Date();

        db.products.forEach(p => {
            if (p.status !== "Archived" && p.expiration) {
                const expDate = new Date(p.expiration);
                const diffDays = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));
                if (diffDays < 0) {
                    expired++;
                } else if (diffDays <= 30) {
                    nearExp++;
                }
            }
        });

        const strip = document.getElementById("inventory-expiration-strip");
        if (expired > 0 || nearExp > 0) {
            if (strip) {
                strip.classList.remove("hidden");
                document.getElementById("expired-count-alert").textContent = expired;
                document.getElementById("nearexp-count-alert").textContent = nearExp;
            }
        } else {
            if (strip) strip.classList.add("hidden");
        }
    }

    function checkLowStocks() {
        let count = 0;
        db.products.forEach(p => {
            if (p.status !== "Archived" && p.qty <= 5) {
                count++;
            }
        });
        
        // update notification badge count
        const badge = document.getElementById("notif-badge");
        if (count > 0) {
            badge.textContent = count;
            badge.classList.remove("hidden");
        } else {
            badge.classList.add("hidden");
        }
    }

    // --------------------------------------------------------------------------
    // POS Terminal Module
    // --------------------------------------------------------------------------
    document.getElementById("pos-search-input").addEventListener("input", renderPOSCatalog);
    document.getElementById("pos-category-filter").addEventListener("change", renderPOSCatalog);
    document.getElementById("pos-clear-cart-btn").addEventListener("click", clearPOSCart);
    document.getElementById("pos-discount").addEventListener("input", calculatePOSBill);
    document.getElementById("pos-pay-btn").addEventListener("click", showCheckoutModal);

    function initPOS() {
        shoppingCart = [];
        document.getElementById("pos-discount").value = 0;
        document.getElementById("pos-vat-rate").textContent = db.settings.taxRate;
        
        // Category options
        const filterCat = document.getElementById("pos-category-filter");
        filterCat.innerHTML = `<option value="">All Categories</option>` + db.categories.map(c => `<option value="${c.id}">${c.name}</option>`).join("");

        // Customer options
        const custSelect = document.getElementById("pos-customer-select");
        custSelect.innerHTML = `<option value="walkin">Walk-in Customer</option>` + 
            db.customers.map(c => `<option value="${c.id}">${c.name} (Pts: ${c.points})</option>`).join("");

        renderPOSCatalog();
        updatePOSCart();
    }

    function renderPOSCatalog() {
        const grid = document.getElementById("pos-products-grid");
        grid.innerHTML = "";

        const query = document.getElementById("pos-search-input").value.trim().toLowerCase();
        const catFilter = document.getElementById("pos-category-filter").value;

        let filtered = db.products.filter(p => p.status === "Active"); // POS only sells active catalog

        if (catFilter) {
            filtered = filtered.filter(p => p.category === catFilter);
        }

        if (query) {
            filtered = filtered.filter(p => p.name.toLowerCase().includes(query) || p.SKU.toLowerCase().includes(query));
        }

        if (filtered.length === 0) {
            showEmptyState(grid, "No active products found", "There are no products matching your search.");
            return;
        }

        filtered.forEach(p => {
            const card = document.createElement("div");
            card.className = `pos-prod-card ${p.qty <= 0 ? 'outofstock' : ''}`;
            
            let qtyClass = "";
            if (p.qty <= 0) qtyClass = "outofstock";
            else if (p.qty <= 2) qtyClass = "critical";
            else if (p.qty <= 5) qtyClass = "low";

            let qtyLabel = `${p.qty} ${p.unit}`;
            if (p.qty <= 0) qtyLabel = "OUT OF STOCK";

            let imgHTML = `<i class="fa-solid fa-box"></i>`;
            if (p.image) {
                imgHTML = `<img src="${p.image}" style="width:100%;height:100%;object-fit:cover;border-radius:4px" onerror="this.outerHTML='<i class=&quot;fa-solid fa-box&quot;></i>'">`;
            }

            card.innerHTML = `
                <div class="pos-prod-img">${imgHTML}</div>
                <div class="pos-prod-name" title="${p.name}">${p.name}</div>
                <div class="pos-prod-footer">
                    <span class="pos-prod-price">${formatCurrency(p.sellingPrice)}</span>
                    <span class="pos-prod-qty ${qtyClass}">${qtyLabel}</span>
                </div>
            `;

            if (p.qty > 0) {
                card.addEventListener("click", () => {
                    addToCart(p);
                });
            }
            grid.appendChild(card);
        });
    }

    function addToCart(product) {
        const existing = shoppingCart.find(item => item.productId === product.id);
        
        // check catalog stock constraint
        const cartQty = existing ? existing.qty : 0;
        if (cartQty >= product.qty) {
            showToast("Out of Stock", `Cannot add more. Retail stock limit is ${product.qty} units.`, "warning");
            return;
        }

        if (existing) {
            existing.qty++;
        } else {
            shoppingCart.push({
                productId: product.id,
                name: product.name,
                price: product.sellingPrice,
                qty: 1
            });
        }
        updatePOSCart();
    }

    function updatePOSCart() {
        const list = document.getElementById("pos-cart-list");
        list.innerHTML = "";

        if (shoppingCart.length === 0) {
            list.innerHTML = `
                <div class="cart-empty">
                    <i class="fa-solid fa-basket-shopping"></i>
                    <p>Cart is empty. Scan barcodes or click on products to add items.</p>
                </div>
            `;
            document.getElementById("pos-pay-btn").disabled = true;
            calculatePOSBill();
            return;
        }

        document.getElementById("pos-pay-btn").disabled = false;

        shoppingCart.forEach((item, index) => {
            const sub = item.price * item.qty;
            const div = document.createElement("div");
            div.className = "cart-item";
            div.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-name" title="${item.name}">${item.name}</div>
                    <div class="cart-item-price">${formatCurrency(item.price)}</div>
                </div>
                <div class="cart-item-qty-control">
                    <button class="cart-qty-btn decrease-qty-btn" data-index="${index}">-</button>
                    <span class="cart-item-qty">${item.qty}</span>
                    <button class="cart-qty-btn increase-qty-btn" data-index="${index}">+</button>
                </div>
                <div class="cart-item-subtotal font-mono">${formatCurrency(sub)}</div>
                <button class="cart-item-remove-btn" data-index="${index}"><i class="fa-solid fa-trash"></i></button>
            `;
            list.appendChild(div);
        });

        // wire events
        list.querySelectorAll(".decrease-qty-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const idx = parseInt(this.getAttribute("data-index"));
                if (shoppingCart[idx].qty > 1) {
                    shoppingCart[idx].qty--;
                } else {
                    shoppingCart.splice(idx, 1);
                }
                updatePOSCart();
            });
        });
        list.querySelectorAll(".increase-qty-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const idx = parseInt(this.getAttribute("data-index"));
                const p = db.products.find(prod => prod.id === shoppingCart[idx].productId);
                if (p && shoppingCart[idx].qty < p.qty) {
                    shoppingCart[idx].qty++;
                    updatePOSCart();
                } else {
                    showToast("Out of Stock", "Stock limit reached.", "warning");
                }
            });
        });
        list.querySelectorAll(".cart-item-remove-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const idx = parseInt(this.getAttribute("data-index"));
                shoppingCart.splice(idx, 1);
                updatePOSCart();
            });
        });

        calculatePOSBill();
    }

    let calculatedTotals = { subtotal: 0, tax: 0, total: 0 };

    function calculatePOSBill() {
        const subtotal = shoppingCart.reduce((acc, cur) => acc + (cur.price * cur.qty), 0);
        const discountPercent = parseFloat(document.getElementById("pos-discount").value) || 0;
        const discountAmount = subtotal * (discountPercent / 100);
        const taxableAmount = subtotal - discountAmount;
        
        const taxRate = parseFloat(db.settings.taxRate) || 0;
        const taxAmount = taxableAmount * (taxRate / 100);
        const grandTotal = taxableAmount + taxAmount;

        calculatedTotals = {
            subtotal,
            discount: discountPercent,
            tax: taxAmount,
            total: grandTotal
        };

        document.getElementById("pos-subtotal").textContent = formatCurrency(subtotal);
        document.getElementById("pos-tax-amount").textContent = formatCurrency(taxAmount);
        document.getElementById("pos-total-amount").textContent = formatCurrency(grandTotal);
    }

    function clearPOSCart() {
        shoppingCart = [];
        updatePOSCart();
    }

    // simulated barcode scan trigger inside POS
    document.getElementById("pos-scan-btn").addEventListener("click", function () {
        handlePOSBarcodeScan();
    });
    document.getElementById("pos-barcode-input").addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            handlePOSBarcodeScan();
        }
    });

    function handlePOSBarcodeScan() {
        const input = document.getElementById("pos-barcode-input");
        const val = input.value.trim();
        if (!val) return;

        const prod = db.products.find(p => p.barcode === val && p.status === "Active");
        if (prod) {
            addToCart(prod);
            showToast("Scanner Detected", `Found and added ${prod.name}`, "success");
        } else {
            showToast("Barcode Scan Error", "Item not found in catalog or is archived.", "danger");
        }
        input.value = "";
    }

    // Checkout Form
    function showCheckoutModal() {
        if (shoppingCart.length === 0) return;
        document.getElementById("checkout-grand-total").textContent = formatCurrency(calculatedTotals.total);
        document.getElementById("checkout-cash-tendered").value = "";
        document.getElementById("checkout-change-amount").textContent = formatCurrency(0);
        
        // default payment method select
        const methodSelect = document.getElementById("checkout-payment-method");
        methodSelect.value = "Cash";
        document.getElementById("checkout-cash-group").classList.remove("hidden");

        openModal("pos-checkout-modal");
    }

    document.getElementById("checkout-payment-method").addEventListener("change", function () {
        const isCash = this.value === "Cash";
        document.getElementById("checkout-cash-group").classList.toggle("hidden", !isCash);
    });

    document.getElementById("checkout-cash-tendered").addEventListener("input", function () {
        const cash = parseFloat(this.value) || 0;
        const change = Math.max(0, cash - calculatedTotals.total);
        document.getElementById("checkout-change-amount").textContent = formatCurrency(change);
    });

    document.getElementById("checkout-complete-btn").addEventListener("click", function () {
        const paymentMethod = document.getElementById("checkout-payment-method").value;
        let cashTendered = calculatedTotals.total;
        let changeDue = 0;

        if (paymentMethod === "Cash") {
            cashTendered = parseFloat(document.getElementById("checkout-cash-tendered").value);
            if (isNaN(cashTendered) || cashTendered < calculatedTotals.total) {
                showToast("Check Amount", "Amount tendered cannot be lower than the grand total.", "warning");
                return;
            }
            changeDue = cashTendered - calculatedTotals.total;
        }

        const customerId = document.getElementById("pos-customer-select").value;

        // Apply deduct stocks & record sales
        shoppingCart.forEach(item => {
            const prod = db.products.find(p => p.id === item.productId);
            if (prod) {
                prod.qty -= item.qty; // deduct stock!
                
                // log stock movement history
                db.inventoryHistory.unshift({
                    id: "h-" + Date.now() + Math.random().toString(36).substr(2, 4),
                    timestamp: formatDateTime(),
                    productId: prod.id,
                    type: "Stock Out",
                    qty: item.qty,
                    source: "Retail Store Shelf",
                    destination: "Customer Checkout",
                    reason: `Sold on Invoice (POS)`,
                    user: currentUser.name
                });
            }
        });

        // Award points if customer registered
        if (customerId !== "walkin") {
            const cust = db.customers.find(c => c.id === customerId);
            if (cust) {
                const pointsEarned = Math.floor(calculatedTotals.total / 10); // 1 point per $10 spent
                cust.points += pointsEarned;
                showToast("Loyalty Points Added", `Awarded ${pointsEarned} loyalty points to customer ${cust.name}`, "success");
            }
        }

        const nextNum = 20001 + db.sales.length;
        const receiptNo = `TXN-${nextNum}`;

        const saleRecord = {
            id: "sale-" + Date.now(),
            receiptNo,
            date: formatDateTime(),
            cashier: currentUser.name,
            customerId,
            paymentMethod,
            items: [...shoppingCart],
            subtotal: calculatedTotals.subtotal,
            discount: calculatedTotals.discount,
            tax: calculatedTotals.tax,
            total: calculatedTotals.total,
            amountTendered: cashTendered,
            changeDue
        };

        db.sales.unshift(saleRecord);
        saveDatabase();
        logAudit("Sales", `Completed sale checkout ${receiptNo} for ${customerId === 'walkin' ? 'Walk-in' : 'Registered Customer'} ($${calculatedTotals.total.toFixed(2)})`);
        
        closeModal("pos-checkout-modal");
        clearPOSCart();
        showToast("Sale Recorded", "Payment transaction completed successfully.", "success");

        // Open Receipt Modal
        showReceiptModal(saleRecord.id);
    });

    function showReceiptModal(saleId) {
        const sale = db.sales.find(s => s.id === saleId);
        if (!sale) return;

        const cust = db.customers.find(c => c.id === sale.customerId);
        const paper = document.getElementById("receipt-thermal-paper");

        let itemsHTML = "";
        sale.items.forEach(item => {
            itemsHTML += `
                <tr>
                    <td>${item.name}<br>${item.qty} x ${formatCurrency(item.price)}</td>
                    <td class="text-right" style="vertical-align:bottom">${formatCurrency(item.price * item.qty)}</td>
                </tr>
            `;
        });

        paper.innerHTML = `
            <div class="receipt-title">${db.settings.name}</div>
            <div class="receipt-subtitle">
                ${db.settings.address}<br>
                Tel: ${db.settings.phone}<br>
                Email: ${db.settings.email}
            </div>
            
            <div class="receipt-info-block">
                <div class="receipt-info-row"><span>RECEIPT NO:</span><strong>${sale.receiptNo}</strong></div>
                <div class="receipt-info-row"><span>DATE/TIME:</span><span>${sale.date}</span></div>
                <div class="receipt-info-row"><span>CASHIER:</span><span>${sale.cashier}</span></div>
                <div class="receipt-info-row"><span>CUSTOMER:</span><span>${cust ? cust.name : 'Walk-in Customer'}</span></div>
            </div>

            <table class="receipt-items-table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th class="text-right">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHTML}
                </tbody>
            </table>

            <div class="receipt-item-summary"><span>SUBTOTAL</span><span>${formatCurrency(sale.subtotal)}</span></div>
            ${sale.discount > 0 ? `<div class="receipt-item-summary"><span>DISCOUNT (${sale.discount}%)</span><span>-${formatCurrency(sale.subtotal * (sale.discount/100))}</span></div>` : ''}
            <div class="receipt-item-summary"><span>VAT/TAX (${db.settings.taxRate}%)</span><span>${formatCurrency(sale.tax)}</span></div>
            
            <div class="receipt-total-row"><span>TOTAL BILL</span><span>${formatCurrency(sale.total)}</span></div>

            <div class="receipt-item-summary"><span>PAYMENT TYPE</span><span>${sale.paymentMethod}</span></div>
            <div class="receipt-item-summary"><span>CASH TENDERED</span><span>${formatCurrency(sale.amountTendered)}</span></div>
            <div class="receipt-item-summary"><span>CHANGE</span><span>${formatCurrency(sale.changeDue)}</span></div>

            <div class="receipt-footer-msg">
                ${db.settings.receiptFooter}<br>
                Powered by Da Bugss IMS
            </div>
        `;

        openModal("receipt-modal");
    }

    // --------------------------------------------------------------------------
    // Customers Management Module
    // --------------------------------------------------------------------------
    let customerSearchTimeout = null;
    document.getElementById("customers-search").addEventListener("input", function () {
        clearTimeout(customerSearchTimeout);
        customerSearchTimeout = setTimeout(renderCustomersTable, 300);
    });

    document.getElementById("add-customer-btn").addEventListener("click", function () {
        document.getElementById("customer-form").reset();
        document.getElementById("customer-id").value = "";
        document.getElementById("customer-modal-title").textContent = "Register Loyalty Customer";
        openModal("customer-modal");
    });

    document.getElementById("customer-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const id = document.getElementById("customer-id").value;
        const name = document.getElementById("cust-name").value.trim();
        const phone = document.getElementById("cust-phone").value.trim();
        const email = document.getElementById("cust-email").value.trim();
        const address = document.getElementById("cust-address").value.trim();

        if (id) {
            const c = db.customers.find(cust => cust.id === id);
            if (c) {
                c.name = name;
                c.phone = phone;
                c.email = email;
                c.address = address;
                logAudit("Settings", `Modified loyalty customer details: ${name}`);
            }
        } else {
            db.customers.push({
                id: "cust-" + Date.now(),
                name, phone, email, address, points: 0
            });
            logAudit("Settings", `Registered loyalty customer: ${name}`);
        }

        saveDatabase();
        closeModal("customer-modal");
        renderCustomersTable();
    });

    function renderCustomersTable() {
        const tbody = document.getElementById("customers-table-body");
        tbody.innerHTML = "";

        const query = document.getElementById("customers-search").value.trim().toLowerCase();
        let filtered = db.customers;

        if (query) {
            filtered = filtered.filter(c => 
                c.name.toLowerCase().includes(query) ||
                (c.phone && c.phone.includes(query)) ||
                (c.email && c.email.toLowerCase().includes(query))
            );
        }

        if (filtered.length === 0) {
            showEmptyState(tbody, "No loyalty customers found", "There are no customers matching your search.");
            return;
        }

        filtered.forEach(c => {
            const purchaseCount = db.sales.filter(s => s.customerId === c.id).length;
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong>${c.name}</strong></td>
                <td>${c.phone || '<span class="text-meta">N/A</span>'}</td>
                <td>${c.email || '<span class="text-meta">N/A</span>'}</td>
                <td>${c.address || '<span class="text-meta">N/A</span>'}</td>
                <td><span class="badge badge-success">${c.points} Pts</span></td>
                <td><span class="badge badge-info">${purchaseCount} Transactions</span></td>
                <td class="text-right">
                    <button class="btn btn-secondary btn-sm edit-cust-btn" data-id="${c.id}"><i class="fa-solid fa-pencil"></i></button>
                    <button class="btn btn-danger btn-sm delete-cust-btn" data-id="${c.id}"><i class="fa-solid fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        tbody.querySelectorAll(".edit-cust-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const c = db.customers.find(cust => cust.id === this.getAttribute("data-id"));
                if (c) {
                    document.getElementById("customer-id").value = c.id;
                    document.getElementById("cust-name").value = c.name;
                    document.getElementById("cust-phone").value = c.phone;
                    document.getElementById("cust-email").value = c.email;
                    document.getElementById("cust-address").value = c.address;
                    document.getElementById("customer-modal-title").textContent = "Edit Loyalty Customer";
                    openModal("customer-modal");
                }
            });
        });

        tbody.querySelectorAll(".delete-cust-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const id = this.getAttribute("data-id");
                if (confirm("Delete loyalty customer record? This wipes their points balance.")) {
                    db.customers = db.customers.filter(c => c.id !== id);
                    saveDatabase();
                    renderCustomersTable();
                }
            });
        });
    }

    // --------------------------------------------------------------------------
    // Employee Management Module
    // --------------------------------------------------------------------------
    let employeeSearchTimeout = null;
    document.getElementById("employees-search").addEventListener("input", function () {
        clearTimeout(employeeSearchTimeout);
        employeeSearchTimeout = setTimeout(renderEmployeesTable, 300);
    });

    document.getElementById("add-employee-btn").addEventListener("click", function () {
        document.getElementById("employee-form").reset();
        document.getElementById("employee-id").value = "";
        document.getElementById("employee-modal-title").textContent = "Register Employee Staff";
        openModal("employee-modal");
    });

    document.getElementById("employee-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const id = document.getElementById("employee-id").value;
        const name = document.getElementById("emp-name").value.trim();
        const position = document.getElementById("emp-position").value;
        const username = document.getElementById("emp-username").value.trim().toLowerCase();
        const password = document.getElementById("emp-password").value;
        const phone = document.getElementById("emp-phone").value.trim();
        const email = document.getElementById("emp-email").value.trim();

        if (id) {
            const emp = db.employees.find(e => e.id === id);
            if (emp) {
                emp.name = name;
                emp.position = position;
                emp.username = username;
                if (password) emp.password = password; // Only update password if they filled it in
                emp.phone = phone;
                emp.email = email;
                logAudit("Settings", `Modified credentials for employee: ${name}`);
            }
        } else {
            db.employees.push({
                id: "emp-" + Date.now(),
                name, position, username, password: password || "password", phone, email, status: "Active"
            });
            logAudit("Settings", `Registered employee user account: ${name} (${position})`);
        }

        saveDatabase();
        closeModal("employee-modal");
        renderEmployeesTable();
    });

    function renderEmployeesTable() {
        const tbody = document.getElementById("employees-table-body");
        tbody.innerHTML = "";

        const query = document.getElementById("employees-search").value.trim().toLowerCase();
        let filtered = db.employees;

        if (query) {
            filtered = filtered.filter(e => 
                e.name.toLowerCase().includes(query) ||
                e.position.toLowerCase().includes(query) ||
                e.username.toLowerCase().includes(query)
            );
        }

        if (filtered.length === 0) {
            showEmptyState(tbody, "No employees found", "There are no employees matching your search.");
            return;
        }

        filtered.forEach(e => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong>${e.name}</strong></td>
                <td><span class="badge badge-info">${e.position}</span></td>
                <td class="font-mono">${e.username}</td>
                <td>${e.email}</td>
                <td>${e.phone || '<span class="text-meta">N/A</span>'}</td>
                <td><span class="badge badge-success">${e.status}</span></td>
                <td class="text-right">
                    <button class="btn btn-secondary btn-sm edit-emp-btn" data-id="${e.id}"><i class="fa-solid fa-user-pen"></i></button>
                    <button class="btn btn-danger btn-sm delete-emp-btn" data-id="${e.id}"><i class="fa-solid fa-user-minus"></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        tbody.querySelectorAll(".edit-emp-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const e = db.employees.find(emp => emp.id === this.getAttribute("data-id"));
                if (e) {
                    document.getElementById("employee-id").value = e.id;
                    document.getElementById("emp-name").value = e.name;
                    document.getElementById("emp-position").value = e.position;
                    document.getElementById("emp-username").value = e.username;
                    document.getElementById("emp-phone").value = e.phone;
                    document.getElementById("emp-email").value = e.email;
                    document.getElementById("employee-modal-title").textContent = "Edit Employee Credentials";
                    openModal("employee-modal");
                }
            });
        });

        tbody.querySelectorAll(".delete-emp-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const id = this.getAttribute("data-id");
                if (confirm("Revoke login credentials and delete employee record?")) {
                    db.employees = db.employees.filter(e => e.id !== id);
                    saveDatabase();
                    renderEmployeesTable();
                }
            });
        });
    }

    // --------------------------------------------------------------------------
    // Reports & Financials Engine
    // --------------------------------------------------------------------------
    let activeReportTab = "sales";
    
    function initReportsView() {
        // Set dates
        document.getElementById("report-start-date").value = getFutureDate(-30);
        document.getElementById("report-end-date").value = getFutureDate(0);
        generateActiveReport();
    }

    document.querySelectorAll(".tab-strip .tab-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            document.querySelectorAll(".tab-strip .tab-btn").forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            activeReportTab = this.getAttribute("data-report");
            generateActiveReport();
        });
    });

    document.getElementById("generate-report-btn").addEventListener("click", generateActiveReport);

    function generateActiveReport() {
        const start = document.getElementById("report-start-date").value;
        const end = document.getElementById("report-end-date").value;

        const output = document.getElementById("report-dynamic-data");
        const title = document.getElementById("report-display-title");
        const subtitle = document.getElementById("report-display-dates");
        
        subtitle.textContent = `Report Period: ${start} to ${end}`;

        if (activeReportTab === "sales") {
            title.textContent = "Sales Performance & Transaction Log";
            renderSalesReport(start, end, output);
        } else if (activeReportTab === "inventory") {
            title.textContent = "Current Inventory & Expirations Report";
            renderInventoryReport(output);
        } else if (activeReportTab === "purchases") {
            title.textContent = "Purchase Orders & Supplier Deliveries";
            renderPurchasesReport(start, end, output);
        } else if (activeReportTab === "financials") {
            title.textContent = "Consolidated Financial Performance Statement";
            renderFinancialsReport(start, end, output);
        }
    }

    function renderSalesReport(start, end, container) {
        // Filter sales by date
        const list = db.sales.filter(s => {
            const dateStr = s.date.split(" ")[0];
            return dateStr >= start && dateStr <= end;
        });

        const totalRevenue = list.reduce((acc, cur) => acc + cur.total, 0);
        const totalVat = list.reduce((acc, cur) => acc + cur.tax, 0);
        const totalSalesCount = list.length;
        const averageOrder = totalSalesCount > 0 ? (totalRevenue / totalSalesCount) : 0;

        let tableRows = "";
        list.forEach(sale => {
            const itemsList = sale.items.map(i => `${i.name} (x${i.qty})`).join(", ");
            tableRows += `
                <tr>
                    <td class="font-mono"><strong>${sale.receiptNo}</strong></td>
                    <td>${sale.date}</td>
                    <td>${sale.cashier}</td>
                    <td>${itemsList}</td>
                    <td class="font-mono text-right">${formatCurrency(sale.total)}</td>
                </tr>
            `;
        });

        if (list.length === 0) {
            tableRows = `<tr><td colspan="5" class="text-center text-muted py-4">No transaction history found for selected date range.</td></tr>`;
        }

        container.innerHTML = `
            <div class="report-summary-boxes">
                <div class="rep-summary-box">
                    <div class="rep-box-title">Total Revenue</div>
                    <div class="rep-box-val text-primary">${formatCurrency(totalRevenue)}</div>
                </div>
                <div class="rep-summary-box">
                    <div class="rep-box-title">Sales Count</div>
                    <div class="rep-box-val">${totalSalesCount}</div>
                </div>
                <div class="rep-summary-box">
                    <div class="rep-box-title">Average Order Value</div>
                    <div class="rep-box-val">${formatCurrency(averageOrder)}</div>
                </div>
                <div class="rep-summary-box">
                    <div class="rep-box-title">Total VAT Collected</div>
                    <div class="rep-box-val">${formatCurrency(totalVat)}</div>
                </div>
            </div>

            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Receipt No</th>
                            <th>Date/Time</th>
                            <th>Cashier</th>
                            <th>Purchased Items</th>
                            <th class="text-right">Total Invoice</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            </div>
        `;
    }

    function renderInventoryReport(container) {
        let inStock = 0, lowStock = 0, outStock = 0, expired = 0, damaged = 0;
        let tableRows = "";

        db.products.forEach(p => {
            if (p.status === "Archived") return;

            const cat = db.categories.find(c => c.id === p.category);
            const brand = db.brands.find(b => b.id === p.brand);
            
            // Stock logic
            let levelLabel = '<span class="badge badge-success">IN STOCK</span>';
            if (p.qty <= 0) {
                levelLabel = '<span class="badge badge-danger">OUT OF STOCK</span>';
                outStock++;
            } else if (p.qty <= 5) {
                levelLabel = '<span class="badge badge-warning">LOW STOCK</span>';
                lowStock++;
            } else {
                inStock++;
            }

            // Expiry details
            let expiryLabel = "Healthy";
            if (p.expiration) {
                const expDate = new Date(p.expiration);
                const diffDays = Math.ceil((expDate - new Date()) / (1000 * 60 * 60 * 24));
                if (diffDays < 0) {
                    expiryLabel = `<span class="text-danger font-weight-700">EXPIRED</span>`;
                    expired++;
                } else if (diffDays <= 30) {
                    expiryLabel = `<span class="text-warning">NEAR EXPIRY (${diffDays}d)</span>`;
                }
            }

            tableRows += `
                <tr>
                    <td><strong>${p.name}</strong><br><span class="text-meta">SKU: ${p.SKU}</span></td>
                    <td>${cat ? cat.name : 'N/A'}</td>
                    <td>${brand ? brand.name : 'N/A'}</td>
                    <td class="font-mono font-weight-700">${p.qty} ${p.unit}</td>
                    <td>${levelLabel}</td>
                    <td>${expiryLabel}</td>
                </tr>
            `;
        });

        // Damaged / Expired count from logs
        db.inventoryHistory.forEach(h => {
            if (h.type === "Damaged") damaged += h.qty;
        });

        container.innerHTML = `
            <div class="report-summary-boxes">
                <div class="rep-summary-box">
                    <div class="rep-box-title">Healthy Products</div>
                    <div class="rep-box-val text-success">${inStock}</div>
                </div>
                <div class="rep-summary-box">
                    <div class="rep-box-title">Low Stock Items</div>
                    <div class="rep-box-val text-warning">${lowStock}</div>
                </div>
                <div class="rep-summary-box">
                    <div class="rep-box-title">Out of Stock Items</div>
                    <div class="rep-box-val text-danger">${outStock}</div>
                </div>
                <div class="rep-summary-box">
                    <div class="rep-box-title">Expired Products</div>
                    <div class="rep-box-val text-danger">${expired}</div>
                </div>
            </div>

            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Stock Count</th>
                            <th>Stock Status</th>
                            <th>Expiration Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            </div>
        `;
    }

    function renderPurchasesReport(start, end, container) {
        const list = db.purchaseOrders.filter(po => po.orderDate >= start && po.orderDate <= end);
        
        let pending = 0, ordered = 0, received = 0, cancelled = 0;
        let totalOutlay = 0;

        let tableRows = "";
        list.forEach(po => {
            const s = db.suppliers.find(sup => sup.id === po.supplierId);
            const itemsSummary = po.items.map(i => `${i.name} (x${i.qty})`).join(", ");

            if (po.status === "Received") {
                received++;
                totalOutlay += po.totalCost;
            }
            if (po.status === "Pending") pending++;
            if (po.status === "Ordered" || po.status === "Approved") ordered++;
            if (po.status === "Cancelled") cancelled++;

            tableRows += `
                <tr>
                    <td class="font-mono"><strong>${po.poNumber}</strong></td>
                    <td>${s ? s.company : 'Unknown'}</td>
                    <td>${po.orderDate}</td>
                    <td><span class="badge ${po.status === 'Received' ? 'badge-success' : 'badge-warning'}">${po.status}</span></td>
                    <td>${itemsSummary}</td>
                    <td class="font-mono text-right">${formatCurrency(po.totalCost)}</td>
                </tr>
            `;
        });

        if (list.length === 0) {
            tableRows = `<tr><td colspan="6" class="text-center text-muted py-4">No Purchase Orders logged during this date range.</td></tr>`;
        }

        container.innerHTML = `
            <div class="report-summary-boxes">
                <div class="rep-summary-box">
                    <div class="rep-box-title">Completed (Received)</div>
                    <div class="rep-box-val text-success">${received}</div>
                </div>
                <div class="rep-summary-box">
                    <div class="rep-box-title">Authorized / In-Transit</div>
                    <div class="rep-box-val text-info">${ordered}</div>
                </div>
                <div class="rep-summary-box">
                    <div class="rep-box-title">Awaiting Approval</div>
                    <div class="rep-box-val text-warning">${pending}</div>
                </div>
                <div class="rep-summary-box">
                    <div class="rep-box-title">Capital Outlay (Received)</div>
                    <div class="rep-box-val text-primary">${formatCurrency(totalOutlay)}</div>
                </div>
            </div>

            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>PO Number</th>
                            <th>Supplier</th>
                            <th>Order Date</th>
                            <th>Status</th>
                            <th>Items List</th>
                            <th class="text-right">Estimated Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            </div>
        `;
    }

    function renderFinancialsReport(start, end, container) {
        // Sales revenue
        const salesInPeriod = db.sales.filter(s => {
            const dateStr = s.date.split(" ")[0];
            return dateStr >= start && dateStr <= end;
        });
        const revenue = salesInPeriod.reduce((acc, cur) => acc + cur.subtotal, 0); // revenue before VAT

        // Cost of Goods Sold (COGS)
        let cogs = 0;
        salesInPeriod.forEach(sale => {
            sale.items.forEach(item => {
                const prod = db.products.find(p => p.id === item.productId);
                const costPrice = prod ? prod.purchasePrice : 0;
                cogs += costPrice * item.qty;
            });
        });

        // Purchases outlay completed
        const purchasesReceived = db.purchaseOrders.filter(po => po.status === "Received" && po.actualDeliveryDate >= start && po.actualDeliveryDate <= end);
        const purchaseOutlay = purchasesReceived.reduce((acc, cur) => acc + cur.totalCost, 0);

        // Waste expenses (damaged write offs & expired write offs)
        let writeOffCost = 0;
        db.inventoryHistory.forEach(h => {
            const dateStr = h.timestamp.split(" ")[0];
            if ((h.type === "Damaged" || h.type === "Expired") && dateStr >= start && dateStr <= end) {
                const prod = db.products.find(p => p.id === h.productId);
                const costPrice = prod ? prod.purchasePrice : 0;
                writeOffCost += costPrice * h.qty;
            }
        });

        const grossProfit = revenue - cogs;
        const totalExpenses = writeOffCost;
        const netProfit = grossProfit - totalExpenses;

        container.innerHTML = `
            <div class="report-summary-boxes mb-5">
                <div class="rep-summary-box">
                    <div class="rep-box-title">Revenue (Pre-Tax)</div>
                    <div class="rep-box-val text-success">${formatCurrency(revenue)}</div>
                </div>
                <div class="rep-summary-box">
                    <div class="rep-box-title">Cost of Goods Sold</div>
                    <div class="rep-box-val text-warning">${formatCurrency(cogs)}</div>
                </div>
                <div class="rep-summary-box">
                    <div class="rep-box-title">Write-Off Expenses</div>
                    <div class="rep-box-val text-danger">${formatCurrency(writeOffCost)}</div>
                </div>
                <div class="rep-summary-box">
                    <div class="rep-box-title">Net Profit Margin</div>
                    <div class="rep-box-val text-primary">${formatCurrency(netProfit)}</div>
                </div>
            </div>

            <div class="details-card max-width-600 mx-auto">
                <h3 class="mb-4">Profit & Loss Statement (P&L Summary)</h3>
                
                <table style="width:100%">
                    <tbody>
                        <tr>
                            <td><strong>Total Gross Sales Revenue</strong></td>
                            <td class="text-right font-mono font-weight-700 text-success">${formatCurrency(revenue)}</td>
                        </tr>
                        <tr>
                            <td style="padding-left: 2rem; color:var(--text-secondary)">Less: Cost of Goods Sold (COGS)</td>
                            <td class="text-right font-mono text-warning">-${formatCurrency(cogs)}</td>
                        </tr>
                        <tr style="border-bottom: 2px solid var(--border-color)">
                            <td><strong>Gross Profit Margin</strong></td>
                            <td class="text-right font-mono font-weight-700 text-primary">${formatCurrency(grossProfit)}</td>
                        </tr>
                        <tr>
                            <td style="padding-top: 1.5rem"><strong>Operating Expenses</strong></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td style="padding-left: 2rem; color:var(--text-secondary)">Expired Stock Write-offs</td>
                            <td class="text-right font-mono text-danger">-${formatCurrency(writeOffCost)}</td>
                        </tr>
                        <tr style="border-bottom: 2px double var(--text-primary)">
                            <td><strong>Net Income (Profit)</strong></td>
                            <td class="text-right font-mono font-weight-700 text-primary">${formatCurrency(netProfit)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    }

    // simulated Export options
    document.getElementById("export-pdf-btn").addEventListener("click", () => {
        window.print(); // simple print to PDF trigger
    });

    document.getElementById("export-csv-btn").addEventListener("click", triggerDownloadCSV);
    document.getElementById("export-excel-btn").addEventListener("click", triggerDownloadCSV);

    function triggerDownloadCSV() {
        let csvContent = "data:text/csv;charset=utf-8,";
        
        if (activeReportTab === "sales") {
            csvContent += "Receipt Number,Transaction Date,Cashier,Total Price\r\n";
            db.sales.forEach(s => {
                csvContent += `${s.receiptNo},${s.date},${s.cashier},${s.total.toFixed(2)}\r\n`;
            });
        } else if (activeReportTab === "inventory") {
            csvContent += "SKU,Product Name,Remaining Quantity,Expiration Date\r\n";
            db.products.forEach(p => {
                csvContent += `${p.SKU},${p.name},${p.qty},${p.expiration || 'N/A'}\r\n`;
            });
        } else {
            csvContent += "Date,Activity Log,User\r\n";
            db.auditTrail.forEach(a => {
                csvContent += `${a.timestamp},${a.desc},${a.user}\r\n`;
            });
        }

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `DaBugss_Report_${activeReportTab}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast("Export Downloaded", "CSV spreadsheet generated.", "success");
    }

    // --------------------------------------------------------------------------
    // Audit Trail Module
    // --------------------------------------------------------------------------
    document.getElementById("audit-search").addEventListener("input", renderAuditTrail);
    document.getElementById("audit-filter-action").addEventListener("change", renderAuditTrail);
    
    document.getElementById("clear-audit-logs-btn").addEventListener("click", function () {
        if (confirm("Are you sure you want to CLEAR all log history? This wipes out your activity records for security audits.")) {
            db.auditTrail = [];
            logAudit("Settings", "Cleared all system audit trails");
            renderAuditTrail();
        }
    });

    function renderAuditTrail() {
        const tbody = document.getElementById("audit-table-body");
        tbody.innerHTML = "";

        const query = document.getElementById("audit-search").value.trim().toLowerCase();
        const actionFilter = document.getElementById("audit-filter-action").value;

        let filtered = db.auditTrail;

        if (actionFilter) {
            filtered = filtered.filter(a => a.category === actionFilter);
        }

        if (query) {
            filtered = filtered.filter(a => 
                a.desc.toLowerCase().includes(query) ||
                a.user.toLowerCase().includes(query) ||
                a.ip.includes(query)
            );
        }

        if (filtered.length === 0) {
            showEmptyState(tbody, "No audit logs found", "There are no audit records matching your current filters.");
            return;
        }

        filtered.forEach(a => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${a.timestamp}</td>
                <td><strong>${a.user}</strong></td>
                <td><span class="badge badge-info">${a.role}</span></td>
                <td><span class="badge badge-primary">${a.category}</span></td>
                <td>${a.desc}</td>
                <td class="font-mono text-meta">${a.ip}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    // --------------------------------------------------------------------------
    // System Settings & Database Backups
    // --------------------------------------------------------------------------
    document.getElementById("settings-company-form").addEventListener("submit", function (e) {
        e.preventDefault();
        
        db.settings.name = document.getElementById("set-company-name").value.trim();
        db.settings.email = document.getElementById("set-company-email").value.trim();
        db.settings.phone = document.getElementById("set-company-phone").value.trim();
        db.settings.address = document.getElementById("set-company-address").value.trim();
        db.settings.currency = document.getElementById("set-currency").value;
        db.settings.taxRate = parseFloat(document.getElementById("set-tax-rate").value);
        db.settings.receiptFooter = document.getElementById("set-receipt-layout").value.trim();

        saveDatabase();
        logAudit("Settings", "Modified company business setting configurations");
        showToast("Settings Saved", "Da Bugss system profile updated.", "success");
    });

    document.getElementById("backup-db-btn").addEventListener("click", function () {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(db, null, 2));
        const dlAnchorElem = document.createElement('a');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", `dabugss_database_backup_${getFutureDate(0)}.json`);
        dlAnchorElem.click();
        logAudit("Settings", "Exported database backup JSON file");
        showToast("Backup Created", "Database snapshot JSON file downloaded.", "success");
    });

    document.getElementById("restore-db-upload").addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (evt) {
            try {
                const restored = JSON.parse(evt.target.result);
                // integrity check
                if (restored.products && restored.categories && restored.settings) {
                    db = restored;
                    saveDatabase();
                    logAudit("Settings", "Restored system database from backup snapshot");
                    showToast("Database Restored", "All tables reverted to backup state successfully.", "success");
                    
                    // force refresh active screen
                    onViewLoaded(activeView);
                } else {
                    showToast("Restore Error", "Invalid database JSON file format.", "danger");
                }
            } catch (err) {
                showToast("Parse Error", "Failed to parse database backup JSON.", "danger");
            }
        };
        reader.readAsText(file);
    });

    // --------------------------------------------------------------------------
    // Global Barcode Simulator Tray
    // --------------------------------------------------------------------------
    const quickScannerTray = document.getElementById("quick-scanner-container");
    
    document.getElementById("quick-scan-toggle").addEventListener("click", function () {
        quickScannerTray.classList.toggle("hidden");
        if (!quickScannerTray.classList.contains("hidden")) {
            document.getElementById("quick-scan-input").focus();
            document.getElementById("quick-scan-result").classList.add("hidden");
        }
    });

    document.getElementById("quick-scanner-close").addEventListener("click", function () {
        quickScannerTray.classList.add("hidden");
    });

    document.getElementById("quick-scan-submit-btn").addEventListener("click", executeGlobalBarcodeScan);
    document.getElementById("quick-scan-input").addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            executeGlobalBarcodeScan();
        }
    });

    function executeGlobalBarcodeScan() {
        const input = document.getElementById("quick-scan-input");
        const val = input.value.trim();
        const resultBox = document.getElementById("quick-scan-result");

        if (!val) return;

        const prod = db.products.find(p => p.barcode === val && p.status === "Active");
        resultBox.classList.remove("hidden");

        if (prod) {
            const cat = db.categories.find(c => c.id === prod.category);
            const brand = db.brands.find(b => b.id === prod.brand);
            
            resultBox.innerHTML = `
                <div class="text-success font-weight-700 mb-1"><i class="fa-solid fa-circle-check"></i> Item Found: ${prod.name}</div>
                <div class="mb-1"><strong>SKU:</strong> ${prod.SKU}</div>
                <div class="mb-1"><strong>Price:</strong> ${formatCurrency(prod.sellingPrice)}</div>
                <div class="mb-1"><strong>In-Stock:</strong> ${prod.qty} ${prod.unit}</div>
                <div><strong>Category:</strong> ${cat ? cat.name : 'N/A'} (Brand: ${brand ? brand.name : 'N/A'})</div>
                <div class="mt-2 text-center">
                    <button class="btn btn-primary btn-sm add-from-scan-btn">Add to Cart</button>
                </div>
            `;

            const addBtn = resultBox.querySelector(".add-from-scan-btn");
            if (prod.qty <= 0) {
                addBtn.disabled = true;
                addBtn.textContent = "Out of Stock";
            } else {
                addBtn.addEventListener("click", () => {
                    addToCart(prod);
                    quickScannerTray.classList.add("hidden");
                });
            }
        } else {
            resultBox.innerHTML = `<span class="text-danger font-weight-700"><i class="fa-solid fa-triangle-exclamation"></i> Barcode not found in database catalog.</span>`;
        }
        input.value = "";
    }

    // --------------------------------------------------------------------------
    // Formatting & Helper Utilities
    // --------------------------------------------------------------------------
    function formatCurrency(amount) {
        const symbol = db.settings ? db.settings.currency : "$";
        return `${symbol}${parseFloat(amount).toFixed(2)}`;
    }

    // Theme Toggle Controller
    document.getElementById("theme-toggle").addEventListener("click", function () {
        const html = document.documentElement;
        const current = html.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        localStorage.setItem("dabugss_theme", next);
    });

    // Load theme from cache
    const cachedTheme = (localStorage.getItem("dabugss_theme") || localStorage.getItem("apexstock_theme"));
    if (cachedTheme) {
        document.documentElement.setAttribute("data-theme", cachedTheme);
    }

    // Collapsible Sidebar Controller
    document.getElementById("collapse-sidebar-btn").addEventListener("click", function () {
        const sidebar = document.querySelector(".sidebar");
        sidebar.classList.toggle("collapsed");
    });

    // Mobile Navigation Toggle
    document.getElementById("mobile-nav-toggle").addEventListener("click", function () {
        const sidebar = document.querySelector(".sidebar");
        sidebar.classList.toggle("collapsed");
        sidebar.classList.toggle("hidden");
    });

    // Wire sidebar navigation click
    document.querySelectorAll(".sidebar-nav li").forEach(item => {
        item.addEventListener("click", function (e) {
            e.preventDefault();
            const viewId = this.getAttribute("data-view");
            if (viewId) {
                switchView(viewId);
                // hide on mobile
                if (window.innerWidth <= 768) {
                    document.querySelector(".sidebar").classList.add("hidden");
                }
            }
        });
    });

    // System Notifications Toggle panel
    document.getElementById("notifications-btn").addEventListener("click", function (e) {
        e.stopPropagation();
        const panel = document.getElementById("notifications-panel");
        panel.classList.toggle("hidden");
        if (!panel.classList.contains("hidden")) {
            renderNotifPanel();
        }
    });

    document.addEventListener("click", function () {
        document.getElementById("notifications-panel").classList.add("hidden");
    });

    document.getElementById("notifications-panel").addEventListener("click", function (e) {
        e.stopPropagation();
    });

    function renderNotifPanel() {
        const list = document.getElementById("notif-list");
        list.innerHTML = "";

        let items = [];
        db.products.forEach(p => {
            if (p.status !== "Archived") {
                if (p.qty <= 0) {
                    items.push({ type: "danger", title: "Out of Stock", text: `${p.name} is completely out of stock.`, icon: "fa-circle-xmark", sub: "low-stock" });
                } else if (p.qty <= 5) {
                    items.push({ type: "warning", title: "Low Stock Alert", text: `${p.name} has only ${p.qty} left.`, icon: "fa-triangle-exclamation", sub: "low-stock" });
                }
                
                if (p.expiration) {
                    const diffDays = Math.ceil((new Date(p.expiration) - new Date()) / (1000 * 60 * 60 * 24));
                    if (diffDays < 0) {
                        items.push({ type: "danger", title: "Product Expired", text: `${p.name} expired on ${p.expiration}`, icon: "fa-clock", sub: "expired" });
                    } else if (diffDays <= 30) {
                        items.push({ type: "warning", title: "Expiring Soon", text: `${p.name} expires in ${diffDays} days`, icon: "fa-clock", sub: "expired" });
                    }
                }
            }
        });

        if (items.length === 0) {
            list.innerHTML = `<div class="notif-empty">No active stock or system warnings.</div>`;
            return;
        }

        items.forEach(item => {
            const div = document.createElement("div");
            div.className = "notif-item unread";
            div.innerHTML = `
                <div class="notif-icon ${item.sub}">
                    <i class="fa-solid ${item.icon}"></i>
                </div>
                <div class="notif-body">
                    <div class="notif-text"><strong>${item.title}:</strong> ${item.text}</div>
                </div>
            `;
            list.appendChild(div);
        });
    }

    document.getElementById("mark-all-read-btn").addEventListener("click", () => {
        showToast("Notifications", "All notifications cleared.", "success");
        document.getElementById("notifications-panel").classList.add("hidden");
    });

    // --------------------------------------------------------------------------
    // Bottom Horizontal Navigation & Side-Scroll Controls
    // --------------------------------------------------------------------------
    document.querySelectorAll("#bottom-bar-track .bottom-tab-chip").forEach(chip => {
        chip.addEventListener("click", function (e) {
            e.preventDefault();
            const viewId = this.getAttribute("data-view");
            if (viewId) switchView(viewId);
        });
    });

    const bottomBarTrack = document.getElementById("bottom-bar-track");
    if (bottomBarTrack) {
        document.getElementById("bottom-scroll-left")?.addEventListener("click", () => {
            bottomBarTrack.scrollBy({ left: -220, behavior: 'smooth' });
        });
        document.getElementById("bottom-scroll-right")?.addEventListener("click", () => {
            bottomBarTrack.scrollBy({ left: 220, behavior: 'smooth' });
        });
    }

    document.getElementById("side-scroll-table-btn")?.addEventListener("click", () => {
        const activeViewEl = document.querySelector(".content-view.active");
        if (activeViewEl) {
            const scroller = activeViewEl.querySelector(".table-responsive") || activeViewEl.querySelector(".max-h-300") || activeViewEl;
            if (scroller) {
                const current = scroller.scrollLeft;
                const max = scroller.scrollWidth - scroller.clientWidth;
                if (current >= max - 10) {
                    scroller.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    scroller.scrollBy({ left: 300, behavior: 'smooth' });
                }
            }
        }
    });

    // Bootstrapping App
    window.addEventListener("DOMContentLoaded", function () {
        initDatabase();
    });

    // Expose APIs for inline onclick triggers
    window.app = {
        switchView,
        showReceiptModal
    };

})();
/* =========================================
   WEEK 6: REUSABLE UI STATE HELPERS
   ========================================= */

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

function showEmptyState(container, title = "No records found", message = "There are no records to display.") {
    if (!container) return;
    container.innerHTML = "";
    const state = createUIState("empty-state-template", title, message);
    if (!state) return;

    if (container.tagName === "TBODY") {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        const columnCount = container.closest("table")?.querySelectorAll("thead th").length || 1;
        cell.colSpan = columnCount;
        cell.className = "text-center ui-state-table-cell";
        cell.appendChild(state);
        row.appendChild(cell);
        container.appendChild(row);
        return;
    }
    container.appendChild(state);
}

function showLoadingState(container, title = "Loading...", message = "Please wait while the data is being loaded.") {
    if (!container) return;
    container.innerHTML = "";
    const state = createUIState("loading-state-template", title, message);
    if (state) container.appendChild(state);
}

function showErrorState(container, title = "Something went wrong", message = "We could not load the requested information.", retryCallback = null) {
    if (!container) return;
    container.innerHTML = "";
    const state = createUIState("error-state-template", title, message);
    if (!state) return;
    const retryButton = state.querySelector(".ui-state-retry");
    if (retryButton && typeof retryCallback === "function") retryButton.addEventListener("click", retryCallback);
    container.appendChild(state);
}

/* =========================================
   END WEEK 6: REUSABLE UI STATE HELPERS
   ========================================= */
