<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'status',
        'priority',
        'due_date',
        'assigned_to',
        'created_by'
    ];

     // une tâche est assignée à un user.
     
   public function assignedTo(){
    return $this->belongsTo(User::class,'assigned_to');
}
    //une tâche est créée par un user (admin).
   
   public function createdBy(){
    return $this->belongsTo(User::class, 'created_by');


    
}
}
