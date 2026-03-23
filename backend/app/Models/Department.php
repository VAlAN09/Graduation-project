<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    protected $table = 'departments';

    protected $primaryKey = 'dep_id';

    public $timestamps = false;

    protected $fillable = [
        'dep_name',
        'description'
    ];

    public function users()
    {
        return $this->hasMany(User::class, 'department_id', 'dep_id');
    }
}
