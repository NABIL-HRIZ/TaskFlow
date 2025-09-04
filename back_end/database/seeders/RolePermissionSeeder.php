<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
        'view tasks',
        'update task status',
        'view profile',
        'create task',
        'edit task',
        'delete task',
        'assign task',
        'manage users',
    ];

     foreach ($permissions as $permission) {
        Permission::firstOrCreate(['name' => $permission]);
    }

     // Roles
    $userRole = Role::firstOrCreate(['name' => 'user']);
    $adminRole = Role::firstOrCreate(['name' => 'admin']);

    
      // User Permissions
    $userRole->givePermissionTo(['view tasks', 'update task status', 'view profile']);

    // Admin Permissions
    $adminRole->givePermissionTo(Permission::all());
    
    }

}
