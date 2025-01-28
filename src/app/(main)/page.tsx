import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CardDataStats from "@/components/CardDataStats";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Home() {
  return (
    <>
      <div>
        <Breadcrumb pageName="Dashboard" />
        <div className="flex flex-col bg-gray-50 p-6 rounded-lg shadow-lg dark:bg-gray-800">
          <h1 className="text-2xl font-bold text-center text-blue-700 dark:text-blue-400 mb-4">
            Bem-vindo ao TeamTasks!
          </h1>
          <p className="text-base text-gray-700 dark:text-gray-300 mb-3 text-center">
            O <span className="font-semibold text-blue-700 dark:text-blue-400">TeamTasks</span> é um sistema inteligente e prático para o gerenciamento de projetos e tarefas. Ele ajuda você a organizar atividades, acompanhar o progresso e incluir comentários diretamente nas tarefas para garantir uma comunicação clara e eficiente.
          </p>
          <p className="text-base text-gray-700 dark:text-gray-300 mb-3 text-center">
            Embora ainda não ofereça suporte para trabalho em conjunto, o TeamTasks foi projetado para atender suas necessidades individuais, ajudando você a manter o foco e aumentar sua produtividade.
          </p>
          <p className="text-base text-gray-700 dark:text-gray-300 mb-3 text-center">
            Está pronto para começar? Clique no botão abaixo para criar seu primeiro projeto e transformar suas ideias em realidade.
          </p>
          <div className="flex justify-center">
            <Link
              type="button"
              href={`/projects/c`}
              className="text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-blue-800 shadow-md transform hover:scale-105 transition-all"
            >
              Novo Projeto
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
