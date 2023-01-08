using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Accounts
{
    public class AccountEdit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Account Account {get; set;}
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
            // public Handler(DataContext context, IMapper mapper){
            //     _context = context;
            // }

            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper){
                _mapper = mapper;
                _context = context;
            }

            // Wait for the introduction to AutoMapper
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var account = await _context.Accounts.FindAsync(request.Account.Id);
                
                if (account == null) return null;

                // All properties in the specific account will be updated
                _mapper.Map(request.Account, account);

                var result = await _context.SaveChangesAsync() > 0;
                if(!result) return Result<Unit>.Failure("Failed to update account");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}