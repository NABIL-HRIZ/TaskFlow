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
        'view users',
        'create users',
        'update users',
        'delete users',
        'view all tasks',
        'view personnel tasks',
        'create task',
        'edit task',
        'delete task',
        
    ];

     foreach ($permissions as $permission) {
        Permission::firstOrCreate(['name' => $permission]);
    }

     // Roles
    $userRole = Role::firstOrCreate(['name' => 'user']);
    $adminRole = Role::firstOrCreate(['name' => 'admin']);

    
      // User Permissions
    $userRole->givePermissionTo([ 
        'create task',
        'edit task',
        'delete task',
      'view personnel tasks',
]);

    // Admin Permissions
    $adminRole->givePermissionTo(Permission::all());
    
    }

}
