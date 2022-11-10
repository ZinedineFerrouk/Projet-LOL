<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\RouterInterface;

class HomeController extends AbstractController
{
    private $routes = [];

    #[Route('/', name: 'home')]
    public function index(RouterInterface $router): JsonResponse
    {
        foreach ($router->getRouteCollection()->all() as $route_name => $route) {
            $this->routes[$route_name] = $route->getPath();
        }

        return $this->json([
            'routes' => $this->routes,
        ]);
    }
}
