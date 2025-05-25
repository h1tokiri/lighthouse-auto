import React, { useEffect, useState } from "react";
import ListingCard from "./ListingCard";
import { useNavigate } from "react-router-dom";

const SearchResults = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    minYear: "",
    maxYear: "",
    minMileage: "",
    maxMileage: "",
    transmission: "",
    bodystyle: "",
    condition: "",
  });

  // Add a new state for active filters
  const [activeFilters, setActiveFilters] = useState({});

  // Get search parameters from URL
  const searchParams = new URLSearchParams(window.location.search);
  const make = searchParams.get("make");
  const model = searchParams.get("model");
  const postalCode = searchParams.get("postalCode");

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    // Set active filters when Apply button is clicked
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
        // Use activeFilters instead of filters
        const queryString = new URLSearchParams({
          make: make || "",
          model: model || "",
          postalCode: postalCode || "",
          ...activeFilters, // Use activeFilters here
        }).toString();

        const response = await fetch(`/api/vehicles/search?${queryString}`);
        if (!response.ok) {
          throw new Error("Failed to fetch results");
        }

        const data = await response.json();
        setVehicles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [make, model, postalCode, activeFilters]); // Change dependency to activeFilters

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading results...</div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="grid grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="col-span-1 bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>

            {/* Price Range */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  name="minPrice"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  className="input input-bordered w-full"
                />
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Year Range */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Year Range</h3>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  name="minYear"
                  placeholder="Min"
                  value={filters.minYear}
                  onChange={handleFilterChange}
                  className="input input-bordered w-full"
                />
                <input
                  type="number"
                  name="maxYear"
                  placeholder="Max"
                  value={filters.maxYear}
                  onChange={handleFilterChange}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Mileage Range */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Mileage Range</h3>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  name="minMileage"
                  placeholder="Min"
                  value={filters.minMileage}
                  onChange={handleFilterChange}
                  className="input input-bordered w-full"
                />
                <input
                  type="number"
                  name="maxMileage"
                  placeholder="Max"
                  value={filters.maxMileage}
                  onChange={handleFilterChange}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Transmission */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Transmission</h3>
              <select
                name="transmission"
                value={filters.transmission}
                onChange={handleFilterChange}
                className="select select-bordered w-full"
              >
                <option value="">Any</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            {/* Body Style */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Body Style</h3>
              <select
                name="bodystyle"
                value={filters.bodystyle}
                onChange={handleFilterChange}
                className="select select-bordered w-full"
              >
                <option value="">Any</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Truck">Truck</option>
                <option value="Coupe">Coupe</option>
                <option value="Wagon">Wagon</option>
                <option value="Van">Van</option>
              </select>
            </div>

            {/* Condition */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Condition</h3>
              <select
                name="condition"
                value={filters.condition}
                onChange={handleFilterChange}
                className="select select-bordered w-full"
              >
                <option value="">Any</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
                <option value="Certified Pre-Owned">Certified Pre-Owned</option>
              </select>
            </div>

            <button onClick={applyFilters} className="btn btn-primary w-full">
              Apply Filters
            </button>
          </div>

          {/* Results Grid */}
          <div className="col-span-3">
            <h1 className="text-3xl font-bold text-blue-600 mb-6">
              Search Results {make && `for ${make}`} {model && `${model}`}
              {postalCode && ` near ${postalCode}`}
            </h1>

            {vehicles.length === 0 ? (
              <div className="text-center text-gray-600 my-10">
                No vehicles found matching your search criteria
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map((vehicle) => (
                  <ListingCard
                    key={vehicle.id}
                    car={{
                      id: vehicle.id,
                      make: vehicle.make,
                      model: vehicle.model,
                      year: vehicle.year,
                      price: vehicle.price,
                      mileage: vehicle.mileage,
                      photourl: vehicle.photos?.[0]?.photourl || null,
                    }}
                    onClick={() => navigate(`/vehicles/${vehicle.id}`)}
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
