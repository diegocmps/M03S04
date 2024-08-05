import { createBrowserRouter } from "react-router-dom";
import { Signin } from "../pages/signin/signin";
import { CadastroPage } from "../pages/cadastro";
import { TemplatePrivateRoute } from "../template/private";
import { CadastroLocais } from "../pages/localidades";
import { List } from "../pages/lista/list";
import { HomePage } from "../pages/dashboard";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Signin />
    },
    {
        path: '/cadastro',
        element: <CadastroPage />
    },
    {
        path: '/dashboard',
        element: <TemplatePrivateRoute />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'localidade',
                element: <CadastroLocais />
            },
            {
                path: 'list',
                element: <List />
            }
        ]
    }
]);
