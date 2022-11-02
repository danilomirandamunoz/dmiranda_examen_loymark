using Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class ActividadRepository : IActividadRepository
    {
        private readonly ApiDbContext context;

        public ActividadRepository(ApiDbContext context)
        {
            this.context = context;
        }


        public List<Actividad> Listar()
        {
            return
               context.Actividad.Include(a => a.Usuario).OrderByDescending(x=>x.FechaCreacion).ToList();
        }
    }
}
