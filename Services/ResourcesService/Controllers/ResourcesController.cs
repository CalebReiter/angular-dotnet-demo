using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ResourcesService.Models;

namespace ResourcesService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResourcesController : ControllerBase
    {

        public class View<T> {
            public int pages { get; set; }
            public int page { get; set; }
            public int top { get; set; }
            public IEnumerable<T> items { get; set; }
        }

        private readonly ResourceContext _context;

        public ResourcesController(ResourceContext context)
        {
            _context = context;
        }

        // GET: api/Resources
        [HttpGet]
        public ActionResult<View<Resource>> GetResources(string q, int? page, int? top)
        {
            var resources = from r in _context.Resources
                select r;
            var count = resources.Count();
            if(!String.IsNullOrEmpty(q)) {
                resources = resources.Where(s => s.Name.Contains(q));
            }
            var _top = top ?? 20;
            _top = _top <= 0 ? 1 : _top;
            var _page = page ?? 0;
            var _skip = _page * _top;
            var response = new View<Resource> {
                pages = (int)Math.Ceiling((double) count / (double) _top),
                page = _page,
                top = _top,
                items = resources.Skip(_skip).Take(_top).ToList()
            };
            ActionResult<View<Resource>> res = response;
            return res;
        }

        // GET: api/Resources/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Resource>> GetResource(long id)
        {
            var resource = await _context.Resources.FindAsync(id);

            if (resource == null)
            {
                return NotFound();
            }

            return resource;
        }

        // PUT: api/Resources/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResource(long id, Resource resource)
        {
            if (id != resource.Id)
            {
                return BadRequest();
            }

            _context.Entry(resource).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResourceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Resources
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Resource>> PostResource(Resource resource)
        {
            _context.Resources.Add(resource);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetResource", new { id = resource.Id }, resource);
        }

        // DELETE: api/Resources/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Resource>> DeleteResource(long id)
        {
            var resource = await _context.Resources.FindAsync(id);
            if (resource == null)
            {
                return NotFound();
            }

            _context.Resources.Remove(resource);
            await _context.SaveChangesAsync();

            return resource;
        }

        private bool ResourceExists(long id)
        {
            return _context.Resources.Any(e => e.Id == id);
        }
    }
}
