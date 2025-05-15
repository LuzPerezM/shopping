import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const profileSchema = z.object({
  name: z.string().min(1, "Nombre requerido"),
  lastName: z.string().min(1, "Apellido requerido"),
  email: z.string().email("Correo inválido"),
  address: z.string().min(1, "Dirección requerida"),
  birthday: z.string().min(1, "Fecha requerida"),
});

type ProfileData = z.infer<typeof profileSchema>;

export const ProfileDetails: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/profile/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        reset(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      }
    };

    fetchUser();
  }, [reset]);

  const onSubmit = async (data: ProfileData) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${process.env.REACT_APP_API_URL}/users/update`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Perfil actualizado exitosamente");
    } catch (error: any) {
      console.error(
        "Error al actualizar perfil:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Mi Perfil</h2>

      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block">Nombre</label>
            <input
              {...register("name")}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block">Apellido</label>
            <input
              {...register("lastName")}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName.message}</p>
            )}
          </div>

          <div>
            <label className="block">Correo Electrónico</label>
            <input
              type="email"
              {...register("email")}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block">Dirección</label>
            <input
              {...register("address")}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.address && (
              <p className="text-red-500">{errors.address.message}</p>
            )}
          </div>

          <div>
            <label className="block">Fecha de Nacimiento</label>
            <input
              type="date"
              {...register("birthday")}
              value={
                getValues("birthday")
                  ? new Date(getValues("birthday")).toISOString().split("T")[0]
                  : ""
              }
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.birthday && (
              <p className="text-red-500">{errors.birthday.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-2 bg-black text-white rounded hover:bg-gray-700"
          >
            Actualizar Perfil
          </button>
        </form>
      )}
    </div>
  );
};
