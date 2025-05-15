import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { Title } from "../components/ui/title";

const schema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  lastName: z.string().min(1, "El apellido es obligatorio"),
  email: z.string().email("Correo electrónico inválido"),
  address: z.string().min(1, "La dirección es obligatoria"),
  birthday: z.string().refine((val) => {
    const date = new Date(val);
    return new Date().getFullYear() - date.getFullYear() >= 18;
  }, "Debes ser mayor de 18 años"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/register`,
        data
      );
      console.log(response.data);
      reset();
      alert("Registro exitoso");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 pt-12 ">
      <Title>Registro de usuario</Title>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 p-8 max-w-3xl mx-auto bg-white shadow-md rounded-lg "
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block">
              Apellido
            </label>
            <input
              type="text"
              id="lastName"
              {...register("lastName")}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block">
            Dirección
          </label>
          <input
            type="text"
            id="address"
            {...register("address")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.address && (
            <p className="text-red-500">{errors.address.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="birthday" className="block">
            Fecha de Nacimiento
          </label>
          <input
            type="date"
            id="birthday"
            {...register("birthday")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.birthday && (
            <p className="text-red-500">{errors.birthday.message}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full p-2 bg-black text-white rounded hover:bg-gray-600"
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};
