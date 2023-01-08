using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Accounts
{
    public class AccountCreate
    {
        // Normally a command does not return anything but its find to return a http-request
        public class Command : IRequest<Result<Unit>>
        {
            public Account Account { get; set; }
        }

        public class CommandValidator: AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Account).SetValidator(new AccountValidator());
            }    
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context){
                _context = context;                
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Accounts.Add(request.Account);
                
                var result = await _context.SaveChangesAsync() > 0; // If entity has been saved returns more than 0 (or true) 
                
                if(!result) return Result<Unit>.Failure("Failed to create account");

                // Unit.value returns nothing but tells controller this has returned successful
                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}