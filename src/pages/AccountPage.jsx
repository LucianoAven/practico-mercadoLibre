import React from 'react';
import { useAuth } from '../context/AuthContext';

// Establece el diseño de la página para iniciar sesión.
const AccountPage = () => {
  // Variable de llave que recopila todos los datos del usuario.
  const { user } = useAuth();

  return (
    <div>
      <h1>Detalles de la Cuenta</h1>
      {user ? (
        // Agrega los datos del usuario.
        <div>
          <p>
            <strong>Nombre de Usuario:</strong> {user.username}
          </p>
          {/*  <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Nombre:</strong> {user.name.firstname} {user.name.lastname}</p>
                    <p><strong>Teléfono:</strong> {user.phone}</p>
                    <p><strong>Dirección:</strong> {user.address.number} {user.address.street}, {user.address.city}, {user.address.zipcode}</p> */}
        </div>
      ) : (
        // Genera una alerta en caso de no encontrarse información del usuario.
        <p>No estás autenticado.</p>
      )}
    </div>
  );
};

export default AccountPage;
