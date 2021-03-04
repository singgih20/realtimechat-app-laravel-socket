<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserMessage extends Model
{
    public function message()
    {
        $this->belongsTo(Message::class);
    }
}
