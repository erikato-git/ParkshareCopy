using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Accounts
{
    public class AccountEdit
    {
        public class Command : IRequest{
            public Account account {get; set;}
        }

        // public class Handler : IRequestHandler<Command>
        // {
        //     private readonly DataContext _context;
        //     public Handler(DataContext context){
        //         _context = context;
        //     }

        //     // Wait for the introduction to AutoMapper
            // public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            // {
            //     var account = await _context.Accounts.FindAsync(request.account.Id);
                
            //     account 
            // }
        // }
    }
}