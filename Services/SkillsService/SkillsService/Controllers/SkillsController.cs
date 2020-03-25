using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkillsService.Models;

namespace SkillsService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkillsController : ControllerBase
    {

        public class View<T> {
            public int pages { get; set; }
            public int page { get; set; }
            public int top { get; set; }
            public IEnumerable<T> items { get; set; }
        }
        private readonly SkillContext _context;

        public SkillsController(SkillContext context)
        {
            _context = context;
        }

        // GET: api/Skills
        [HttpGet]
        public ActionResult<View<Skill>> GetSkills(string q, int? page, int? top)
        {
            var skills = from r in _context.Skills
                select r;
            var count = skills.Count();
            if(!String.IsNullOrEmpty(q)) {
                skills = skills.Where(s => s.SkillName.Contains(q));
            }
            var _top = top ?? 20;
            _top = _top <= 0 ? 1 : _top;
            var _page = page ?? 0;
            var _skip = _page * _top;
            var response = new View<Skill> {
                pages = (int)Math.Ceiling((double) count / (double) _top),
                page = _page,
                top = _top,
                items = skills.Skip(_skip).Take(_top).ToList()
            };
            ActionResult<View<Skill>> res = response;
            return res;
        }

        // GET: api/Skills/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Skill>> GetSkill(long id)
        {
            var skill = await _context.Skills.FindAsync(id);

            if (skill == null)
            {
                return NotFound();
            }

            return skill;
        }

        // PUT: api/Skills/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSkill(long id, Skill skill)
        {
            if (id != skill.Id)
            {
                return BadRequest();
            }

            _context.Entry(skill).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SkillExists(id))
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

        // POST: api/Skills
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Skill>> PostSkill(Skill skill)
        {
            _context.Skills.Add(skill);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSkill", new { id = skill.Id }, skill);
        }

        // DELETE: api/Skills/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Skill>> DeleteSkill(long id)
        {
            var skill = await _context.Skills.FindAsync(id);
            if (skill == null)
            {
                return NotFound();
            }

            _context.Skills.Remove(skill);
            await _context.SaveChangesAsync();

            return skill;
        }

        private bool SkillExists(long id)
        {
            return _context.Skills.Any(e => e.Id == id);
        }
    }
}
