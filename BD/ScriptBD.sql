USE [master]
GO
/****** Object:  Database [loymark]    Script Date: 02-11-2022 14:59:40 ******/
CREATE DATABASE [loymark]

USE [loymark]
GO
/****** Object:  Table [dbo].[Actividad]    Script Date: 02-11-2022 14:59:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Actividad](
	[IdActividad] [int] IDENTITY(1,1) NOT NULL,
	[FechaCreacion] [datetime] NULL,
	[IdUsuario] [int] NULL,
	[Detalle] [varchar](max) NULL,
 CONSTRAINT [PK_Actividad] PRIMARY KEY CLUSTERED 
(
	[IdActividad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 02-11-2022 14:59:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[IdUsuario] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](250) NULL,
	[Apellido] [varchar](250) NULL,
	[CorreoElectronico] [varchar](500) NULL,
	[Telefono] [decimal](18, 0) NULL,
	[FechaNacimiento] [datetime] NULL,
	[CodigoPais] [varchar](10) NULL,
	[DeseaContacto] [bit] NULL,
	[Eliminado] [bit] NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[IdUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Trigger [dbo].[TG_DELETE_USUARIO]    Script Date: 02-11-2022 14:59:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[TG_DELETE_USUARIO]
ON [dbo].[Usuario]
AFTER DELETE--, DELETE, UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Actividad(
        FechaCreacion,
		IdUsuario,
		Detalle
    )
    SELECT
        getdate(),
        i.IdUsuario,
        'se elimino el usuario'
    FROM
        deleted i

		
END
GO
ALTER TABLE [dbo].[Usuario] ENABLE TRIGGER [TG_DELETE_USUARIO]
GO
/****** Object:  Trigger [dbo].[TG_INSERT_USUARIO]    Script Date: 02-11-2022 14:59:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create TRIGGER [dbo].[TG_INSERT_USUARIO]
ON [dbo].[Usuario]
AFTER INSERT--, DELETE, UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Actividad(
        FechaCreacion,
		IdUsuario,
		Detalle
    )
    SELECT
        getdate(),
        i.IdUsuario,
        'se creo el usuario'
    FROM
        inserted i

		
END
GO
ALTER TABLE [dbo].[Usuario] ENABLE TRIGGER [TG_INSERT_USUARIO]
GO
/****** Object:  Trigger [dbo].[TG_UPDATE_USUARIO]    Script Date: 02-11-2022 14:59:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[TG_UPDATE_USUARIO]
ON [dbo].[Usuario]
AFTER UPDATE--, DELETE, UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Actividad(
        FechaCreacion,
		IdUsuario,
		Detalle
    )
    SELECT
        getdate(),
        i.IdUsuario,
         case when i.Eliminado = 1 then 'se elimino el usuario' else 'se actualizo el usuario' end
    FROM
        inserted i

		
END
GO
ALTER TABLE [dbo].[Usuario] ENABLE TRIGGER [TG_UPDATE_USUARIO]
GO

