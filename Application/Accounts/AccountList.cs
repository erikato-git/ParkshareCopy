using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

// Mediator-pattern tilfører ikke noget til projektet, da det er forholdvis et enkelt projekt.
// Det tilfører blot unødvendig kompleksitet og overhead. Det er blot for at øve udførelsen af 
// Mediator-pattern efter CQRS (segregering mellem query and handler) 

namespace Application.Accounts
{
    public class AccountList
    {
        public class Query: IRequest<List<Account>>{

        }

        public class Handler : IRequestHandler<Query, List<Account>>
        {
            private readonly DataContext _context;
    
            public Handler(DataContext context)
            {
                _context = context;
            }
            
            public async Task<List<Account>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Accounts.ToListAsync();
            }
        }
    }
}