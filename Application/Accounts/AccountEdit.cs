using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Accounts
{
    public class AccountEdit
    {
        public class Command : IRequest{
            public Account Account {get; set;}
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            // public Handler(DataContext context, IMapper mapper){
            //     _context = context;
            // }

            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper){
                _mapper = mapper;
                _context = context;
            }

            // Wait for the introduction to AutoMapper
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var account = await _context.Accounts.FindAsync(request.Account.Id);
                
                // All properties in the specific account will be updated
                _mapper.Map(request.Account, account);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}