import { useState, useEffect } from 'react';
import { TravelPackage } from '../components/customer/TravelPackageCard';
import { API_ENDPOINTS } from '../../config/api';

interface Meta {
  current_page: number;
  total_pages: number;
  total_count: number;
}

export function useTravelPackages(page = 1) {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch_ = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`${API_ENDPOINTS.clientTravelPackages}?page=${page}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch packages');
        setPackages(data.travel_packages);
        setMeta(data.meta);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetch_();
  }, [page]);

  return { packages, meta, loading, error };
}