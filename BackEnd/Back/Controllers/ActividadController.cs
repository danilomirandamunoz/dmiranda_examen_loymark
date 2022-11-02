using Back.Entity;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace Back.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ActividadController : Controller
    {
        private readonly IActividadRepository actividadRepository;

        public ActividadController(IActividadRepository actividadRepository)
        {

            this.actividadRepository = actividadRepository;
        }

        [HttpGet, Route("Get")]
        public IActionResult Listar()
        {
            RespuestaApi respuesta = new RespuestaApi();
            var result = this.actividadRepository.Listar();
            respuesta.Respuesta = result;
            return Ok(respuesta);
        }
    }
}
