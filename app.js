// 1. Registro del Service Worker (Requisito Stack Básico PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service Worker registrado con éxito', reg))
            .catch(err => console.warn('Error al registrar el Service Worker', err));
    });
}

// 2. Requisito 3: Verificador Offline / Online
const updateOnlineStatus = () => {
    if (navigator.onLine) {
        // Quita la clase, el mensaje desaparece
        document.body.classList.remove('offline');
        fetchApiData(); // Recarga los datos al volver el internet
    } else {
        // Agrega la clase, el mensaje aparece
        document.body.classList.add('offline');
    }
};

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// Verificar el estado al cargar la página
updateOnlineStatus();

// 3. Requisito 2: Consumir WebAPI original
function fetchApiData() {
    // Sustituye esta URL por el endpoint de tu API en la nube
    const apiUrl = 'https://apiactividad2-2.onrender.com/api/productos'; 
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('lista-datos');
            list.innerHTML = ''; // Limpiar lista
            
            // Ejemplo de renderizado de datos
            data.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item.nombre; // Ajusta según la estructura de tu JSON
                list.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching API:', error));
}