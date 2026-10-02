<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('sku')->nullable()->after('product_name');
            $table->string('barcode')->nullable()->after('sku');
            $table->string('brand')->nullable()->after('barcode');
            $table->string('unit')->default('pcs')->after('quantity');
            $table->decimal('purchase_price', 10, 2)->default(0)->after('price');
            $table->decimal('selling_price', 10, 2)->default(0)->after('purchase_price');
            $table->date('expiration')->nullable()->after('selling_price');
            $table->text('description')->nullable()->after('expiration');
            $table->text('image')->nullable()->after('description');
            $table->string('status')->default('Active')->after('image');
        });

        Schema::table('suppliers', function (Blueprint $table) {
            $table->string('contact_person')->nullable()->after('supplier_name');
            $table->string('phone')->nullable()->after('contact_number');
            $table->string('email')->nullable()->after('phone');
            $table->text('address')->nullable()->after('email');
        });

        Schema::table('categories', function (Blueprint $table) {
            $table->text('description')->nullable()->after('category_name');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn([
                'sku',
                'barcode',
                'brand',
                'unit',
                'purchase_price',
                'selling_price',
                'expiration',
                'description',
                'image',
                'status',
            ]);
        });

        Schema::table('suppliers', function (Blueprint $table) {
            $table->dropColumn([
                'contact_person',
                'phone',
                'email',
                'address',
            ]);
        });

        Schema::table('categories', function (Blueprint $table) {
            $table->dropColumn('description');
        });
    }
};
