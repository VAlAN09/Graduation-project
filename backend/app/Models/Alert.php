<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Alert extends Model
{
    protected $table = 'alerts';

    protected $primaryKey = 'alert_id';

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'alert_type',
        'content'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}
