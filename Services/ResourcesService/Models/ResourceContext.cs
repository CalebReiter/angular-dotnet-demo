using Microsoft.EntityFrameworkCore;

namespace ResourcesService.Models
{
    public class ResourceContext : DbContext
    {
        public ResourceContext(DbContextOptions<ResourceContext> options)
            : base(options)
        {
        }

        public DbSet<Resource> Resources { get; set; }

    }
}