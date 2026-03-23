<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payroll extends Model
{
    protected $table = 'payroll';

    protected $primaryKey = 'payroll_id';

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'period_start',
        'period_end',
        'base_salary',
        'bonuses',
        'deductions'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}
