using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Accounts
{
    public class AccountDelete
    {
        public class Command: IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            public readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var account = await _context.Accounts.FindAsync(request.Id);

                _context.Remove(account);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}