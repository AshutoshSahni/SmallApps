using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class NotesController : ControllerBase
{
    private readonly AppDbContext _context;

    public NotesController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/notes
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Note>>> GetNotes()
    {
        return await _context.Notes.ToListAsync();
    }

    // GET: api/notes/5
    [Authorize]
    [HttpGet("{id}")]
    public async Task<ActionResult<Note>> GetNote(int id)
    {
        var note = await _context.Notes.FindAsync(id);

        if (note == null)
            return NotFound();

        return note;
    }

    // POST: api/notes
    [HttpPost]
    public async Task<ActionResult<Note>> CreateNote(Note note)
    {
        _context.Notes.Add(note);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetNote), new { id = note.Id }, note);
    }

    // PUT: api/notes/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateNote(int id, Note updatedNote)
    {
        if (id != updatedNote.Id)
            return BadRequest();

        _context.Entry(updatedNote).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Notes.Any(e => e.Id == id))
                return NotFound();
            else
                throw;
        }

        return NoContent();
    }

    // DELETE: api/notes/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteNote(int id)
    {
        var note = await _context.Notes.FindAsync(id);

        if (note == null)
            return NotFound();

        _context.Notes.Remove(note);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}