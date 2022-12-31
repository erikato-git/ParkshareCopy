using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Accounts
{
    public class AccountCreate
    {
        public class Command : IRequest{
            public Account Account { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context){
                _context = context;                
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Accounts.Add(request.Account);
                await _context.SaveChangesAsync();
                
                // sends nothing, uses to tell mediator that actions has finished
                return Unit.Value;
            }
        }

    }
}