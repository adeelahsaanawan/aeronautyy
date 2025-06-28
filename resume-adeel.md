%-------------------------
% Resume in Latex
% Author : Matty
% Based on: https://github.com/jakegut/resume (which was based on https://github.com/sb2nov/resume)
% License : MIT
%------------------------

\documentclass[letterpaper,11pt]{article}

\usepackage{latexsym}
\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage{marvosym}
\usepackage[usenames,dvipsnames]{color}
\usepackage{verbatim}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{fancyhdr}
\usepackage[english]{babel}
\usepackage{tabularx}
\usepackage{xcolor}
\usepackage{fontawesome5}
\usepackage{multicol}
\usepackage{comment}

\input{glyphtounicode}

% -------------------- FONT --------------------
\pagestyle{fancy}
\fancyhf{} % clear all header and footer fields
\fancyfoot{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}

% Adjust margins
\addtolength{\oddsidemargin}{-0.5in}
\addtolength{\evensidemargin}{-0.5in}
\addtolength{\textwidth}{1in}
\addtolength{\topmargin}{-1in} % Default was -.5in
\addtolength{\textheight}{1.0in}

\urlstyle{same}

\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}

% Section formatting
\titleformat{\section}{
  \vspace{-5pt}\scshape\raggedright\large
}{}{0em}{}[\color{black}\titlerule \vspace{-5pt}]

% Subsection formatting
\titleformat{\subsection}{
  \vspace{-4pt}\scshape\raggedright\large
}{\hspace{-.15in}}{0em}{}[\color{black}\vspace{-8pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\pdfgentounicode=1

% -------------------- CUSTOM COMMANDS --------------------
\newcommand{\resumeItem}[1]{
  \item\small{
    {#1 \vspace{-2pt}}
  }
}

\newcommand{\resumeSubheading}[4]{
  \vspace{-2pt}\item
    \begin{tabular*}{0.97\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{#1} & #2 \\
      \textit{\small#3} & \textit{\small #4} \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeSubSubheading}[2]{
    \item
    \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
      \textit{\small#1} & \textit{\small #2} \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeProjectHeading}[2]{
    \item
    \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
      \small#1 & #2 \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeSubItem}[1]{\resumeItem{#1}\vspace{-4pt}}
\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.15in, label={}]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-5pt}}

\renewcommand\labelitemii{$\vcenter{\hbox{\tiny$\bullet$}}$}

\setlength{\footskip}{4.08003pt}
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% -------------------- START OF DOCUMENT --------------------
\begin{document}

% -------------------- HEADING--------------------
\begin{flushright}
  \vspace{-4pt}
  \color{gray}
  \item
  \date{today}
\end{flushright}

\vspace{-7pt}

\begin{center}
    \textbf{\Huge \scshape Adeel Ahsan} \\ \vspace{8pt}
    \small 
    %\faIcon{github}
    %\href{https://github.com/adeelahsaanawan}{\underline{adeelahsaanawan}} $  $
    \faIcon{code}
    \href{https://aeronautyy.com}
    {\underline{aeronautyy.com}} $  $
    \faIcon{linkedin}
    \href{https://linkedin.com/in/adeelahsaanawan}{\underline{adeelahsaanawan}} $  $
    \faIcon{envelope}
    \href{mailto:maahsan@mun.ca}
    {\underline{maahsan@mun.ca}}
    \faIcon{phone-square}
    \href{tel:+923193125492}
    {\underline{+1-709-2197411}}
\end{center}
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% -------------------- EXPERIENCE --------------------
\section{Work Experience}
  \resumeSubHeadingListStart
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        \resumeProjectHeading
          {\textbf{Memorial University,}{\ St. Johns, Canada} $|$ \footnotesize\emph{Graduate Research $\&$ Teaching Assistant}\vspace{8pt}}{Sep, 2023 - Present}
          {\small{\begin{itemize}         
  \item Nonlinear model predictive control design of a quadrotor
      \item Extended state extended Kalman filter based NMPC control of quadrotor
      \item Optimal waypoint navigation for a drone with dynamics and obstacle constraints
      \item Convex safe corridor generation in cluttered obstacle environments (no-fly zones)
      \item Convex trajectory optimization algorithm for fixed-wing UAVs and drones
      \item Hardware-in-the-loop simulation setup for DJI M300 using ROS \& OSDK
      \item Trajectory planner and controller implementation with HITL simulations
      \item Learning quadrotor dynamics using feed‐forward neural networks with ReLU
  \item Physics‐informed NN for quadrotor dynamics by embedding rigid‐body ODEs in the training loss
  
    
          \end{itemize}}}
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        \resumeProjectHeading
          {\textbf{Turkish Aerospace,}{\ Islamabad, Pakistan} $|$ \footnotesize\emph{Control Design Engineer}\vspace{8pt}}{April, 2023 - Sep, 2023}
          {\small{\begin{itemize}         
              \item  Programmatic trimming and linearization of nonlinear models
              \item Development of longitudinal and lateral flight control design for a fighter jet aircraft
              \item  Autonomous landing system design and safe-landing region prediction
              \item Software and hardware in loop testing
          \end{itemize}}}
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        \resumeProjectHeading
          {\textbf{Advanced Rocket Technologies,}{\ London, UK}\vspace{8pt} $|$ \footnotesize\emph{GNC Engineer (Part Time)}}{Jan, 2023 - Sep, 2023}
            {\small{\begin{itemize}
              \item  Development of nonlinear 6 DOF flight simulator and control design for a sounding rocket          
          \end{itemize}}}
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        \resumeProjectHeading
          {\textbf{National Engineering \& Scientific Commission} $|$ \footnotesize\emph{Assistant Manager}\vspace{8pt}}{Aug, 2021 - April, 2023}
            {\small{\begin{itemize}
              \item  Development of 6 DOF nonlinear flight simulators for different aerospace systems        
              \item  Design and development of flight control system for aerial vehicles
              \item  Software in loop testing of controllers in embedded C++ code
              \item  System identification of actuators and dynamical models of aerospace systems
              \item  Technical report writing and documentation of these projects, and testing procedures
          \end{itemize}}}
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        \resumeProjectHeading
          {\textbf{AZoNetwork} $|$ \footnotesize\emph{Technical Writer}\vspace{8pt}}{Jan, 2022 - Oct, 2022}
            {\small{\begin{itemize}
              \item  Writing technical articles on robotics, AI, sensors, and nanotechnology       
              \item  Conducting observational studies to improve understanding and content
              \item  Creating customized marketing-aligned content based on client needs
          \end{itemize}}}
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        \resumeProjectHeading
          {\textbf{National Engineering \& Scientific Commission} $|$ \footnotesize\emph{Intern}\vspace{8pt}}{July, 2020 - Aug, 2020}
            {\small{\begin{itemize}
              \item  Mathematical modeling and development of 6 DOF simulation for a quadrotor     
              \item  Implemented various control strategies including loop shaping, PID, LQI, and H-infinity on a quadrotor
              \item  Implementation and flight testing for different control strategies on APM 2.8 autopilot
              \item  Calibration, pre and post flight testing of APM 2.8 based quadrotor
          \end{itemize}}}
              \vspace{10pt}
        \resumeSubHeadingListEnd 
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \vspace{10pt}
    \clearpage
    % -------------------- TEACHING EXPERIENCE --------------------
\section{Teaching Experience}

\begin{tabularx}{\textwidth}{>{\raggedright\arraybackslash}p{0.18\textwidth}  % Year–Term
                                    X                                           % Course & Role
                                    >{\raggedleft\arraybackslash}p{0.32\textwidth}} % Institution
\textbf{2025 (Spring)} & Mechatronics II; Instrumentation — \textit{TA} & \textit{Memorial University} \\[2pt]
\textbf{2025 (Winter)} & Mechatronics I; Control Systems I — \textit{TA} & \textit{Memorial University} \\[2pt]
\textbf{2024 (Fall)}   & Computer-Aided Engineering — \textit{TA}       & \textit{Memorial University} \\[2pt]
\textbf{2024 (Summer)} & Control Systems II; Instrumentation — \textit{TA} & \textit{Memorial University} \\[2pt]
\textbf{2024 (Winter)} & Mechatronics I — \textit{TA}                   & \textit{Memorial University } \\
\end{tabularx}
   \vspace{10pt}
% -------------------- EDUCATION --------------------
\section{Education}
  \resumeSubHeadingListStart

      \resumeSubheading
      {Memorial University of Newfoundland, Canada}{Sep, 2023 - Present}
      {Master of Engineering in Electrical Engineering}{GPA: 4.0/4.0}
          {\small{\begin{itemize}
              \item Major: Model-Based Optimal Trajectory Planning, Optimization and Control Design of a Quadrotor.
           \end{itemize}}}
           
    \resumeSubheading
      {Institute of Space Technology, Pakistan}{August 2021}
      {Bachelor of Science in Aerospace Engineering}{GPA: 3.75/4.0}
          {\small{\begin{itemize}
              \item Thesis: Robust Control of a Quadrotor: An ADRC Approach.
          \end{itemize}}}

    \vspace{10pt}

  \resumeSubHeadingListEnd
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% -------------------- SKILLS --------------------
\section{Skills}
    \small{
    \begin{multicols}{2}
    \begin{itemize}
        \item MATLAB/Simulink
        \item Nonlinear Flight Simulator Development
        \item Flight Control Design
        \item Nonlinear and Linear Optimization
        \item Optimal Guidance and Navigation
        \item Convex Optimization
        \item Linear Controls
        \item Robust Controls
        \item Trajectory Optimization
        \item Path Planning
        \item Image Processing
        \item Drones
        \item Flight Dynamics    
        \item Nonlinear Dynamic Inversion Control
        \item Nonlinear Model Predictive Control
        \item PID / LQR / LQI / Lead - Lag Controllers
        \item C/C++
        \item Python
        \item Pixhawk/PX4 Integration with MATLAB 
        \item DJI OSDK \& ROS
        \item Drone Pilot
    \end{itemize}
    \end{multicols}
    }
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% -------------------- AWARDS --------------------
\section{Awards}
  \resumeSubHeadingListStart

      \resumeSubheading
      {Fellow of the School of Graduate Studies}{October, 2024}
      {This award is made in recognition of continued academic excellence throughout the program.}{} 
      \vspace{3 mm}

    \resumeSubheading
      {Ocean Idea Challenge Award}{November, 2024}
      {For winning a startup idea challenge in solving ocean related problem.}{} 
      \vspace{3 mm}
      
    \resumeSubheading
      {Vice Chancellor's Gold Medal}{August 2021}
      {Awarded a Vice Chancellor's Gold Medal for the best final year project}{} 
      \vspace{3 mm}
      
    \resumeSubheading
      {Government Fellowship Award}{August 2018}
      {Completed Bachelor’s degree at IST under a fully funded Government fellowship }{} 
      \vspace{3 mm}
      
    \resumeSubheading
      {Chief Minister's Laptop Award}{Sep 2017}
      {Awarded a Chief Minister's laptop for excellent performance in Matriculation exams}{}
      
    \vspace{10pt}

  \resumeSubHeadingListEnd
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% -------------------- Publications --------------------
\section{Publications}
    \small{
    \begin{itemize}
        \item   M. A. Ahsan, H. Zeeshan Iqbal Khan, J. Rajput and J. Riaz, "Active Disturbance Rejection Control of a Quadrotor: A Comparative Study," 2022 19th International Bhurban Conference on Applied Sciences and Technology (IBCAST), Islamabad, Pakistan, 2022, pp. 444-450.
    \end{itemize}
    }
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    % -------------------- PROJECTS -------------------- {Section is Commented}
\begin{comment}
\section{Projects}
    \resumeSubHeadingListStart
    
        \resumeProjectHeading
        {\textbf{ChatBuzz} $|$ \footnotesize\emph{TypeScript, HTML/CSS, Node.js, Webpack, Twitch API, Git, Unix Shell, VS Code}}{May 2023 -- Present}
        \resumeItemListStart
            \resumeItem{Developed a full-stack web application for Twitch livestreamers to display repeated chat messages on OBS}
            \resumeItem{Experimented with Twitch API's OAuth Access Tokens to get chat data from the given channel}
            % \resumeItem{Used minimal API calls, the bulk of the code was self-made logic and design}
            % \resumeItem{Chose to restart the entire project to optimize runtime and experience}
            \resumeItem{Collaborated with livestreamers to get feedback and suggested features}
            \resumeItem{Solved problems relating to asynchronous tasks}
            % \resumeItem{Optimized UX (User Experience) e.g. bought a simple domain name, made documentation, recorded a setup \& demo video, customization through URL arguments}
            % \resumeItem{Published to GitHub and obsproject.com}
        \resumeItemListEnd
          
        \resumeProjectHeading
        {\textbf{FoodDropper} $|$ \footnotesize\emph{Java, Maven, Spigot API, Git, IntelliJ IDEA}}{August 2022}
        \resumeItemListStart
            \resumeItem{Developed a Minecraft server plugin to limit players to one way of replenishing their hunger bar}
            % \resumeItem{Created intended behavior by making logic complying to the extensive Spigot API in Java}
            \resumeItem{Used persistent data containers to save and load data, ensuring that it persists across plugin resets}
            \resumeItem{Optimized UX (User Experience) e.g. prioritized sound design, timing of food drops, supplied saturation level, and had to address many potential workarounds in the numerous ways of destroying the food dropper}
            % \resumeItem{Published to GitHub and spigotmc.org}
        \resumeItemListEnd
          
    \resumeSubHeadingListEnd
\end{comment}
\end{document}
