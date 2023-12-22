import React from 'react'

export default function () {
  return (
    <div className='navbar'>
        <ul>
        <li><a href="#"><i class="fas fa-home"></i> Main Page</a></li>
        <li><a href="#"><i class="fas fa-comments"></i> Comment Page</a></li>
        <li><a href="#"><i class="fas fa-info-circle"></i> About</a></li>
        <li><a href="#" className='login'><i class="fas fa-user"></i> Login</a></li>
        </ul>
    </div>
  )
}
