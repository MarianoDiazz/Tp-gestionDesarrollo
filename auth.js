// auth.js - Sistema de autenticación para FitGym
// Incluir este archivo en todas las páginas que necesiten mostrar el estado de login

document.addEventListener('DOMContentLoaded', function() {
    initAuth();
});

function initAuth() {
    const usuario = localStorage.getItem('usuario');
    const loginBtnNav = document.getElementById('login-btn-nav');
    const userMenu = document.getElementById('user-menu');
    const userBtn = document.getElementById('user-btn');
    const userDropdown = document.getElementById('user-dropdown');
    const logoutBtn = document.getElementById('logout-btn');

    // Si hay usuario logueado
    if (usuario) {
        // Ocultar botón de login
        if (loginBtnNav) loginBtnNav.style.display = 'none';
        
        // Mostrar menú de usuario
        if (userMenu) userMenu.style.display = 'block';
        
        // Actualizar nombre de usuario
        const primeraLetra = usuario.charAt(0);
        const userName = document.getElementById('user-name');
        const userNameFull = document.getElementById('user-name-full');
        const userAvatar = document.getElementById('user-avatar');
        const userAvatarLarge = document.getElementById('user-avatar-large');
        
        if (userName) userName.textContent = usuario;
        if (userNameFull) userNameFull.textContent = usuario;
        if (userAvatar) userAvatar.textContent = primeraLetra;
        if (userAvatarLarge) userAvatarLarge.textContent = primeraLetra;
    } else {
        // Mostrar botón de login
        if (loginBtnNav) loginBtnNav.style.display = 'block';
        
        // Ocultar menú de usuario
        if (userMenu) userMenu.style.display = 'none';
    }

    // Toggle dropdown al hacer click en el botón de usuario
    if (userBtn) {
        userBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (userDropdown) {
                userDropdown.classList.toggle('show');
            }
        });
    }

    // Cerrar dropdown al hacer click fuera
    document.addEventListener('click', function(e) {
        if (userDropdown && userMenu && !userMenu.contains(e.target)) {
            userDropdown.classList.remove('show');
        }
    });

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Determinar si estamos en una página dentro de /pages/ o en la raíz
            const isInPagesFolder = window.location.pathname.includes('/pages/');
            const redirectPath = isInPagesFolder ? '../index.html' : 'index.html';
            
            localStorage.removeItem('usuario');
            window.location.href = redirectPath;
        });
    }
}

// Función auxiliar para verificar si el usuario está logueado
function isUserLoggedIn() {
    return localStorage.getItem('usuario') !== null;
}

// Función para obtener el nombre del usuario logueado
function getLoggedUser() {
    return localStorage.getItem('usuario');
}

// Función para cerrar sesión (puede ser llamada desde cualquier parte)
function logout() {
    localStorage.removeItem('usuario');
    window.location.href = 'index.html';
}