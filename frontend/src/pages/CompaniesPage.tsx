import React from 'react';
import { Building, Search, MapPin, Briefcase, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import CompanyFilters from '@/components/companies/CompanyFilters';
import { CompaniesProvider, useCompanies } from '@/contexts/CompaniesContext';

const CompaniesPageContent: React.FC = () => {
  const { 
    filteredCompanies, 
    isLoading, 
    searchTerm, 
    setSearchTerm,
    selectedIndustries,
    setSelectedIndustries,
    selectedSizes,
    setSelectedSizes
  } = useCompanies();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <section>
      <div className="bg-jobboard-light py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-bold text-jobboard-darkblue mb-4">Browse Companies</h1>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Discover top employers hiring now. Research company profiles, read reviews, and explore job opportunities.
          </p>

          {/* Search Bar */}
          <div className="relative mb-8 max-w-2xl">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search companies by name, description or location..."
              className="pl-10 py-3"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="grid grid-cols-1 md:!grid-cols-4 gap-6">
            {/* Sidebar with filters */}
            <div className="md:col-span-1">
              <CompanyFilters
                selectedIndustries={selectedIndustries}
                setSelectedIndustries={setSelectedIndustries}
                selectedSizes={selectedSizes}
                setSelectedSizes={setSelectedSizes}
              />
              
              {/* Employer Call-to-Action Section */}
              <div className="mt-8 bg-gradient-to-r from-[#211951] to-[#836FFF] rounded-lg shadow-lg p-6 text-center">
                <Building className="h-12 w-12 mx-auto text-white mb-4" />
                <h2 className="text-xl font-bold text-white mb-3">Are You an Employer?</h2>
                <p className="text-jobboard-light opacity-90 mb-6 text-sm">
                  Create your company profile and start posting jobs to find the perfect candidates.
                </p>
                <Link to="/company/profile">
                  <Button className="bg-white hover:bg-gray-100 text-jobboard-darkblue cursor-pointer font-semibold w-full">
                    Create Company Profile
                  </Button>
                </Link>
              </div>
            </div>

            {/* Main content with company listings */}
            <div className="md:col-span-3">
              {isLoading ? (
                // Loading skeletons
                <div className="grid grid-cols-1 md:!grid-cols-2 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="h-32 bg-gray-200"></div>
                        <div className="p-6">
                          <Skeleton className="h-6 w-3/4 mb-4" />
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-4 w-2/3" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <>
                  {filteredCompanies.length === 0 ? (
                    <div className="text-center py-12">
                      <Building className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">No companies found</h3>
                      <p className="text-gray-500">
                        Try adjusting your search or filters to find what you're looking for.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:!grid-cols-2 gap-6">
                      {filteredCompanies.map((company) => (
                        <Link to={`/companies/${company.id}`} key={company.id}>
                          <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                            <CardContent className="p-0">
                              <div className="h-32 bg-gradient-to-r from-jobboard-purple/20 to-jobboard-teal/20 relative">
                                {company.logo ? (
                                  <img 
                                    src={company.logo} 
                                    alt={`${company.name} logo`} 
                                    className="absolute bottom-0 left-6 w-16 h-16 rounded-md border-2 border-white bg-white object-contain"
                                  />
                                ) : (
                                  <div className="absolute bottom-0 left-6 w-16 h-16 rounded-md border-2 border-white bg-white flex items-center justify-center">
                                    <Building className="h-8 w-8 text-jobboard-purple" />
                                  </div>
                                )}
                              </div>
                              <div className="p-6 pt-4">
                                <div className="flex justify-between items-start">
                                  <h3 className="text-xl font-semibold text-jobboard-darkblue mt-2">{company.name}</h3>
                                  <Badge variant="outline" className="bg-jobboard-light/50">
                                    {company.industry}
                                  </Badge>
                                </div>
                                <div className="flex items-center text-gray-500 mt-2 text-sm">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  <span>{company.location}</span>
                                </div>
                                <p className="text-gray-600 mt-3 text-sm line-clamp-2">
                                  {company.description}
                                </p>
                                <div className="flex items-center gap-4 mt-4">
                                  {company.size && (
                                    <div className="flex items-center text-xs text-gray-500">
                                      <Users className="h-3 w-3 mr-1" />
                                      <span>{company.size}</span>
                                    </div>
                                  )}
                                  {company.foundedYear && (
                                    <div className="flex items-center text-xs text-gray-500">
                                      <Briefcase className="h-3 w-3 mr-1" />
                                      <span>Est. {company.foundedYear}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CompaniesPage: React.FC = () => {
  return (
    <CompaniesProvider>
      <CompaniesPageContent />
    </CompaniesProvider>
  );
};

export default CompaniesPage;
