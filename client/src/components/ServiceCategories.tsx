import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Home, 
  Scale, 
  Calculator, 
  Wrench, 
  Car, 
  Baby, 
  Heart, 
  Camera,
  Laptop,
  Scissors,
  Book,
  Palette
} from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Home Services",
    icon: Home,
    description: "Cleaning, repairs, maintenance",
    serviceCount: 1250,
    color: "bg-blue-50 text-blue-600"
  },
  {
    id: 2,
    name: "Legal Services",
    icon: Scale,
    description: "Lawyers, documentation, consultation",
    serviceCount: 890,
    color: "bg-purple-50 text-purple-600"
  },
  {
    id: 3,
    name: "Accounting & Finance",
    icon: Calculator,
    description: "Tax filing, bookkeeping, financial advice",
    serviceCount: 650,
    color: "bg-green-50 text-green-600"
  },
  {
    id: 4,
    name: "Repairs & Maintenance",
    icon: Wrench,
    description: "Plumbing, electrical, appliance repair",
    serviceCount: 2100,
    color: "bg-orange-50 text-orange-600"
  },
  {
    id: 5,
    name: "Automotive",
    icon: Car,
    description: "Car wash, repair, maintenance",
    serviceCount: 780,
    color: "bg-red-50 text-red-600"
  },
  {
    id: 6,
    name: "Childcare",
    icon: Baby,
    description: "Babysitting, tutoring, daycare",
    serviceCount: 560,
    color: "bg-pink-50 text-pink-600"
  },
  {
    id: 7,
    name: "Healthcare",
    icon: Heart,
    description: "Home nursing, physiotherapy, wellness",
    serviceCount: 420,
    color: "bg-teal-50 text-teal-600"
  },
  {
    id: 8,
    name: "Photography",
    icon: Camera,
    description: "Event photography, portraits, video",
    serviceCount: 340,
    color: "bg-indigo-50 text-indigo-600"
  },
  {
    id: 9,
    name: "Tech Support",
    icon: Laptop,
    description: "Computer repair, setup, troubleshooting",
    serviceCount: 690,
    color: "bg-gray-50 text-gray-600"
  },
  {
    id: 10,
    name: "Beauty & Grooming",
    icon: Scissors,
    description: "Salon services, spa, massage",
    serviceCount: 480,
    color: "bg-rose-50 text-rose-600"
  },
  {
    id: 11,
    name: "Education",
    icon: Book,
    description: "Tutoring, training, courses",
    serviceCount: 380,
    color: "bg-amber-50 text-amber-600"
  },
  {
    id: 12,
    name: "Creative Services",
    icon: Palette,
    description: "Design, art, content creation",
    serviceCount: 290,
    color: "bg-violet-50 text-violet-600"
  }
];

export function ServiceCategories() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-4">Browse Services by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the right professional for your needs across our wide range of service categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${category.color}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {category.description}
                      </p>
                      <Badge variant="secondary" className="mt-2 text-xs">
                        {category.serviceCount.toLocaleString()} providers
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}