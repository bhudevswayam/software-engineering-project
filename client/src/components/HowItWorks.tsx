import { Search, UserCheck, Calendar, Star } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Search & Browse",
    description: "Find the service you need and browse verified professionals in your area",
    icon: Search,
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "Compare & Choose",
    description: "View profiles, read reviews, and compare prices to find the perfect match",
    icon: UserCheck,
    color: "bg-green-500"
  },
  {
    id: 3,
    title: "Book Service",
    description: "Schedule your appointment online or request quotes for custom projects",
    icon: Calendar,
    color: "bg-purple-500"
  },
  {
    id: 4,
    title: "Rate & Review",
    description: "Share your experience to help others and build a trusted community",
    icon: Star,
    color: "bg-yellow-500"
  }
];

export function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-4">How ServiceHub Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Getting the help you need is simple with our easy 4-step process
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={step.id} className="text-center relative">
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gray-200 z-0">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                      <div className="w-3 h-3 bg-gray-200 rounded-full border-2 border-white"></div>
                    </div>
                  </div>
                )}
                
                <div className="relative z-10">
                  <div className={`${step.color} w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 relative`}>
                    <IconComponent className="h-10 w-10 text-white" />
                    <div className="absolute -top-2 -right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                      <span className="text-sm font-medium text-gray-700">{step.id}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl mb-4">Ready to get started?</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Join thousands of satisfied customers who have found quality services through our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
              Find Services
            </button>
            <button className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors">
              Join as Provider
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}