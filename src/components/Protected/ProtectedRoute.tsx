import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
    isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isAuthenticated }) => {
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;  // Reindirizza a login se non autenticato
    }
    return <>{children}</>;  // Rende il contenuto (es. la pagina agenda) solo se autenticato
};

export default ProtectedRoute;