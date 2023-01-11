using Application.Core;
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
        public class Query: IRequest<Result<List<Account>>>{

        }

        public class Handler : IRequestHandler<Query, Result<List<Account>>>
        {
            private readonly DataContext _context;
    
            public Handler(DataContext context)
            {
                _context = context;
            }
            
            public async Task<Result<List<Account>>> Handle(Query request, CancellationToken cancellationToken)
            {
                // to extract data from an account with its join-tabel
                // var activities = await _context.Activities
                //     .Include(a => a.Attendees)
                //     .ThenInclude(u => u.AppUser)
                //     .ToListAsync(cancellationToken)

                // var activitiesToReturn = _mapper.Map<List<ActivityDto>>(activities);

                // return Result<List<ActivityDto>>.Success(activitiesToReturn)

                return Result<List<Account>>.Success(await _context.Accounts.ToListAsync());
            }
        }
    }
}