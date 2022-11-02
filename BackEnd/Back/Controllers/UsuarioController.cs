using Back.Entity;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Services;

namespace Back.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : Controller
    {
        private readonly IUsuarioRepository usuarioRepository;

        public UsuarioController(IUsuarioRepository usuarioRepository )
        {
            this.usuarioRepository = usuarioRepository;
        }

        [HttpGet, Route("Get")]
        public IActionResult Listar()
        {
            RespuestaApi respuesta = new RespuestaApi();
            var result = this.usuarioRepository.Listar();
            respuesta.Respuesta = result;
            return Ok(respuesta);
        }

        [HttpGet, Route("GetById/{id}")]
        public IActionResult ObtenerPorId(int id)
        {
            RespuestaApi respuesta = new RespuestaApi();
            var result = this.usuarioRepository.ObtenerPorId(id);
            respuesta.Respuesta = result;
            return Ok(respuesta);
        }

        [HttpPost, Route("Add")]
        public IActionResult Agregar([FromBody] Usuario usuario)
        {
            RespuestaApi respuesta = new RespuestaApi();
            if (ModelState.IsValid)
            {
                var result = usuarioRepository.Agregar(usuario);
                if (result == 0)
                {
                    respuesta.Codigo = -1;
                    respuesta.Respuesta = "No se pudo agregar el usuario";
                    return StatusCode(StatusCodes.Status500InternalServerError, respuesta);
                }
                respuesta.Respuesta = "Se agregó el usuario exitosamente";
                return Ok(respuesta);
            }
            else
            {
                return StatusCode(StatusCodes.Status400BadRequest, ObtenerErroresModelState(ModelState));
            }


        }

        [HttpPut, Route("Update")]
        public IActionResult Actualizar([FromBody] Usuario usuario)
        {
            RespuestaApi respuesta = new RespuestaApi();
            if (ModelState.IsValid)
            {
                var result = usuarioRepository.Actualizar(usuario);
                if (!result)
                {
                    respuesta.Codigo = -1;
                    respuesta.Respuesta = "No se pudo modificar el cliente";
                    return StatusCode(StatusCodes.Status500InternalServerError, respuesta);
                }
                respuesta.Respuesta = "se actualizó el cliente correctamente";
                return Ok(respuesta);
            }
            else
            {
                return StatusCode(StatusCodes.Status400BadRequest, ObtenerErroresModelState(ModelState));
            }



        }

        [HttpDelete, Route("Delete/{id}")]
        public IActionResult Borrar(int id)
        {
            RespuestaApi respuesta = new RespuestaApi();
            if (ModelState.IsValid)
            {
                var result = usuarioRepository.Borrar(id);
                if (!result)
                {
                    respuesta.Codigo = -1;
                    respuesta.Respuesta = "No se pudo eliminar el cliente";
                    return StatusCode(StatusCodes.Status500InternalServerError, respuesta);
                }
                respuesta.Respuesta = "se eliminó el cliente correctamente";
                return Ok(respuesta);
            }
            else
            {
                return StatusCode(StatusCodes.Status400BadRequest, ObtenerErroresModelState(ModelState));
            }
        }

        private List<string> ObtenerErroresModelState(ModelStateDictionary model)
        {
            List<string> mensajes = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
            return mensajes;
        }
    }
}
