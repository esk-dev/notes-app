FROM mcr.microsoft.com/dotnet/aspnet:8.0 as base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
COPY . /src
WORKDIR /src
RUN ls
RUN dotnet build "NotesBackend.csproj" -c Release -o /backend/build

FROM build AS publish
RUN dotnet publish "NotesBackend.csproj" -c Release -o /backend/publish

FROM base AS final
WORKDIR /backend
COPY --from=publish /backend/publish .
ENTRYPOINT ["dotnet", "NotesBackend.dll"]