import React, { useEffect, useState } from "react";
import ListingCard from "./ListingCard";
import { useNavigate } from "react-router-dom";

const SearchResults = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    minYear: "",
    maxYear: "",
    minMileage: "",
    maxMileage: "",
    transmission: "",
    bodystyle: "",
    condition: ""
  });

  const [activeFilters, setActiveFilters] = useState({});

  const searchParams = new URLSearchParams(window.location.search);
  const make = searchParams.get('make');
  const model = searchParams.get('model');
  const postalCode = searchParams.get('postalCode');

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    setActiveFilters(filters);

    const queryParams = new URLSearchParams(window.location.search);
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.set(key, value);
      } else {
        queryParams.delete(key);
      }
    });
    navigate(`/search?${queryParams.toString()}`);
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const queryString = new URLSearchParams({
          make: make || '',
          model: model || '',
          postalCode: postalCode || '',
          ...activeFilters
        }).toString();

        const response = await fetch(`/api/vehicles/search?${queryString}`);
        if (!response.ok) throw new Error('Failed to fetch results');

        const data = await response.json();
        setVehicles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [make, model, postalCode, activeFilters]);

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-xl">Loading results...</div>
  </div>;

  if (error) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-xl text-red-600">Error: {error}</div>
  </div>;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#2f2d2d" }}>
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="grid grid-cols-4 gap-6">

          {/* Filters Sidebar */}
          <div className="col-span-1 bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            {["Price", "Year", "Mileage"].map(range => (
              <div className="mb-4" key={range}>
                <h3 className="font-medium mb-2">{range} Range</h3>
                <div className="grid grid-cols-2 gap-2">
                  <input type="number" name={`min${range}`} placeholder="Min" value={filters[`min${range}`]} onChange={handleFilterChange} className="input input-bordered w-full" />
                  <input type="number" name={`max${range}`} placeholder="Max" value={filters[`max${range}`]} onChange={handleFilterChange} className="input input-bordered w-full" />
                </div>
              </div>
            ))}

            {["transmission", "bodystyle", "condition"].map(field => (
              <div className="mb-4" key={field}>
                <h3 className="font-medium mb-2">{field.charAt(0).toUpperCase() + field.slice(1)}</h3>
                <select name={field} value={filters[field]} onChange={handleFilterChange} className="select select-bordered w-full">
                  <option value="">Any</option>
                  {field === "transmission" && ["Automatic", "Manual"].map(v => <option key={v} value={v}>{v}</option>)}
                  {field === "bodystyle" && ["Sedan", "SUV", "Truck", "Coupe", "Wagon", "Van"].map(v => <option key={v} value={v}>{v}</option>)}
                  {field === "condition" && ["New", "Used", "Certified Pre-Owned"].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            ))}

            <button onClick={applyFilters} className="btn btn-primary w-full">Apply Filters</button>
          </div>

          {/* Results Grid */}
          <div className="col-span-3">
            <h1 className="text-3xl font-bold text-blue-600 mb-6">
              Search Results {make && `for ${make}`} {model && `${model}`} {postalCode && ` near ${postalCode}`}
            </h1>

            {vehicles.length === 0 ? (
              <div className="text-center text-gray-600 my-10">No vehicles found matching your search criteria</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map(vehicle => (
                  <ListingCard
                    key={vehicle.id}
                    car={{
                      id: vehicle.id,
                      make: vehicle.make,
                      model: vehicle.model,
                      year: vehicle.year,
                      price: vehicle.price,
                      mileage: vehicle.mileage,
                      photoUrl: vehicle.photos?.[0]?.photourl
                      ? `/uploads/${vehicle.photos[0].photourl.replace(/^.*[\\/]/, '')}`
                      : null

                    }}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default SearchResults;
