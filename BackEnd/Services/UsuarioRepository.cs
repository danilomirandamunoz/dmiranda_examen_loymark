using Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly ApiDbContext context;

        public UsuarioRepository(ApiDbContext context)
        {
            this.context = context;
        }

        public bool Borrar(int id)
        {
            bool resultado = false;
            var registroBD = this.context.Usuario.FirstOrDefault(x => x.IdUsuario == id);
            if (registroBD != null)
            {
                registroBD.Eliminado = true;
                this.context.Entry(registroBD).State = EntityState.Modified;
                this.context.SaveChanges();
                resultado = true;
            }
            else
            {
                resultado = false;
            }
            return resultado;
        }


        public List<Usuario> Listar()
        {
            return this.context.Usuario.Where(x=>x.Eliminado == false).ToList();
        }

        public Usuario ObtenerPorId(int id)
        {
            return this.context.Usuario.FirstOrDefault<Usuario>(x => x.IdUsuario == id);
        }

        public int Agregar(Usuario usuario)
        {
            this.context.Usuario.Add(usuario);
            this.context.SaveChanges();
            return usuario.IdUsuario;
        }

        public bool Actualizar(Usuario usuario)
        {
            bool resultado = false;
            this.context.Entry(usuario).State = EntityState.Modified;
            this.context.SaveChanges();
            resultado = true;

            return resultado;
        }
    }
}