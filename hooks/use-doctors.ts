'use client';

import { createDoctor, getAvailableDoctors, getDoctors, updateDoctor } from '@/lib/actions/doctors';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useGetDoctors() {
  const result = useQuery({
    queryKey: ['GetDoctors'],
    queryFn: getDoctors,
  });

  return result;
}

export function useCreateDoctor() {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: createDoctor,
    onSuccess: () => {
      // invalidate related queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ['getDoctors'] });
    },
    onError: (error) => console.log('Error while creating a doctor'),
  });

  return result;
}

export function useUpdateDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDoctor,
    onSuccess: () => {
      // invalidate related queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ['getDoctors'] });
    },
    onError: (error) => console.error('Failed to update doctor:', error),
  });
}

export function useAvailableDoctors() {
  const result = useQuery({
    queryKey: ['getAvailableDoctors'],
    queryFn: getAvailableDoctors,
  });

  return result;
}
