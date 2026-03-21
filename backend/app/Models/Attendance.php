<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    protected $table = 'attendance'; 
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'setting_id',
        'date',
        'time_in',
        'time_out',
        'status',
        'late_minutes',
        'early_leave_minutes',
        'overtime_minutes'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}