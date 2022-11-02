using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface IUsuarioRepository
    {
        List<Usuario> Listar();
        Usuario ObtenerPorId(int id);
        int Agregar(Usuario usuario);
        bool Actualizar(Usuario usuario);
        bool Borrar(int id);
    }
}
